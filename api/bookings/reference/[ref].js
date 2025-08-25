const connectDB = require('../../_db');
const Booking = require('../../../models/Booking');

export default async function handler(req, res) {
  await connectDB();

  const { ref } = req.query;

  if (req.method === 'GET') {
    try {
      const booking = await Booking.findOne({ 
        bookingReference: ref 
      }).populate('eventId');
      
      if (!booking) {
        return res.status(404).json({ message: 'Booking not found' });
      }
      
      res.json(booking);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}