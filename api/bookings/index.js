const connectDB = require('../_db');
const Booking = require('../../models/Booking');
const Event = require('../../models/Event');

// Generate booking reference
const generateBookingRef = () => {
  return 'BK' + Date.now() + Math.random().toString(36).substr(2, 5).toUpperCase();
};

export default async function handler(req, res) {
  await connectDB();

  if (req.method === 'POST') {
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
  } else if (req.method === 'GET') {
    try {
      const bookings = await Booking.find().populate('eventId').sort({ createdAt: -1 });
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}