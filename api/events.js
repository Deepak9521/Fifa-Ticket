const mongoose = require('mongoose');
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
      const { id } = req.query;
      
      if (id) {
        // Get single event
        const event = await Event.findById(id);
        if (!event) {
          return res.status(404).json({ message: 'Event not found' });
        }
        res.json(event);
      } else {
        // Get all events
        const events = await Event.find({}).sort({ date: 1 });
        res.json(events);
      }
    } else if (req.method === 'POST') {
      // Create new event
      const event = new Event({
        ...req.body,
        availableSeats: req.body.totalSeats
      });
      const savedEvent = await event.save();
      res.status(201).json(savedEvent);
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ message: error.message });
  }
};