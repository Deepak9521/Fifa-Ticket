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

// Event Schema
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

const Event = mongoose.models.Event || mongoose.model('Event', eventSchema);

exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  try {
    await connectDB();

    if (event.httpMethod === 'GET') {
      // Check if it's a single event request
      const pathSegments = event.path.split('/');
      const eventId = pathSegments[pathSegments.length - 1];
      
      if (eventId && eventId !== 'events' && mongoose.Types.ObjectId.isValid(eventId)) {
        // Get single event
        const singleEvent = await Event.findById(eventId);
        if (!singleEvent) {
          return {
            statusCode: 404,
            headers,
            body: JSON.stringify({ message: 'Event not found' }),
          };
        }
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(singleEvent),
        };
      } else {
        // Get all events
        const events = await Event.find({}).sort({ date: 1 });
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(events),
        };
      }
    } else if (event.httpMethod === 'POST') {
      const body = JSON.parse(event.body);
      const newEvent = new Event({
        ...body,
        availableSeats: body.totalSeats
      });
      const savedEvent = await newEvent.save();
      
      return {
        statusCode: 201,
        headers,
        body: JSON.stringify(savedEvent),
      };
    } else {
      return {
        statusCode: 405,
        headers,
        body: JSON.stringify({ message: `Method ${event.httpMethod} Not Allowed` }),
      };
    }
  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ message: error.message }),
    };
  }
};