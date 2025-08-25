const connectDB = require('../_db');
const Event = require('../../models/Event');

export default async function handler(req, res) {
  await connectDB();

  if (req.method === 'GET') {
    try {
      const events = await Event.find({}).sort({ date: 1 });
      res.json(events);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else if (req.method === 'POST') {
    try {
      const event = new Event({
        ...req.body,
        availableSeats: req.body.totalSeats
      });
      const savedEvent = await event.save();
      res.status(201).json(savedEvent);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}