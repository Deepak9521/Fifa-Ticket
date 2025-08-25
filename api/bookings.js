const mongoose = require('mongoose');
const Booking = require('../models/Booking');
const Event = require('../models/Event');

// MongoDB connection
let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/sports-tickets';
  
  try {
    const db = await mongoose.connect(MONGODB_URI);
    cachedDb = db;
    return db;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

// Generate booking reference
const generateBookingRef = () => {
  return 'BK' + Date.now() + Math.random().toString(36).substr(2, 5).toUpperCase();
};

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    await connectToDatabase();

    if (req.method === 'GET') {
      const { ref } = req.query;
      
      if (ref) {
        // Get booking by reference
        const booking = await Booking.findOne({ 
          bookingReference: ref 
        }).populate('eventId');
        
        if (!booking) {
          return res.status(404).json({ message: 'Booking not found' });
        }
        
        res.json(booking);
      } else {
        // Get all bookings
        const bookings = await Booking.find().populate('eventId').sort({ createdAt: -1 });
        res.json(bookings);
      }
    } else if (req.method === 'POST') {
      // Create new booking
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
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(400).json({ message: error.message });
  }
};