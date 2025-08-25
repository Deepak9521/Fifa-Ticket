const mongoose = require('mongoose');

// MongoDB connection
let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    return;
  }

  try {
    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI environment variable is not defined');
    }

    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

// Schemas
const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  venue: { type: String, required: true },
  price: { type: Number, required: true },
  totalSeats: { type: Number, required: true },
  availableSeats: { type: Number, required: true },
  category: { type: String, required: true },
  image: { type: String }
}, {
  timestamps: true
});

const bookingSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  customerPhone: { type: String, required: true },
  ticketQuantity: { type: Number, required: true, min: 1 },
  totalAmount: { type: Number, required: true },
  bookingReference: { type: String, required: true, unique: true },
  status: { type: String, enum: ['confirmed', 'cancelled'], default: 'confirmed' }
}, {
  timestamps: true
});

const Event = mongoose.models.Event || mongoose.model('Event', eventSchema);
const Booking = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);

exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ message: `Method ${event.httpMethod} Not Allowed` }),
    };
  }

  try {
    await connectDB();

    // Extract booking reference from path
    const pathSegments = event.path.split('/');
    const bookingRef = pathSegments[pathSegments.length - 1];

    if (!bookingRef || bookingRef === 'booking-reference') {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ message: 'Booking reference is required' }),
      };
    }

    const booking = await Booking.findOne({ 
      bookingReference: bookingRef 
    }).populate('eventId');
    
    if (!booking) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ message: 'Booking not found' }),
      };
    }
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(booking),
    };
  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ message: error.message }),
    };
  }
};