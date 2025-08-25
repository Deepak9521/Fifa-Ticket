const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Event = require('../models/Event');

// Generate booking reference
const generateBookingRef = () => {
  return 'BK' + Date.now() + Math.random().toString(36).substr(2, 5).toUpperCase();
};

// Create new booking
router.post('/', async (req, res) => {
  try {
    const { eventId, customerName, customerEmail, customerPhone, ticketQuantity } = req.body;

    // Check if event exists and has available seats
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (event.availableSeats < ticketQuantity) {
      return res.status(400).json({ 
        message: `Only ${event.availableSeats} seats available` 
      });
    }

    // Calculate total amount
    const totalAmount = event.price * ticketQuantity;

    // Create booking
    const booking = new Booking({
      eventId,
      customerName,
      customerEmail,
      customerPhone,
      ticketQuantity,
      totalAmount,
      bookingReference: generateBookingRef()
    });

    // Update available seats
    event.availableSeats -= ticketQuantity;
    await event.save();

    const savedBooking = await booking.save();
    const populatedBooking = await Booking.findById(savedBooking._id).populate('eventId');

    res.status(201).json(populatedBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get booking by reference
router.get('/reference/:ref', async (req, res) => {
  try {
    const booking = await Booking.findOne({ 
      bookingReference: req.params.ref 
    }).populate('eventId');
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all bookings (admin)
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find().populate('eventId').sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;