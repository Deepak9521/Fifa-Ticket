const mongoose = require('mongoose');
const Event = require('./models/Event');
require('dotenv').config();

const sampleEvents = [
  {
    title: "Lakers vs Warriors - NBA Championship",
    description: "Epic basketball showdown between two legendary teams in the NBA finals.",
    sport: "Basketball",
    venue: "Staples Center, Los Angeles",
    date: new Date('2025-09-15'),
    time: "7:30 PM",
    price: 150,
    totalSeats: 500,
    availableSeats: 500
  },
  {
    title: "Super Bowl LVIX",
    description: "The biggest game in American football. Don't miss this historic match!",
    sport: "Football",
    venue: "MetLife Stadium, New Jersey",
    date: new Date('2025-12-09'),
    time: "6:00 PM",
    price: 300,
    totalSeats: 1000,
    availableSeats: 1000
  },
  {
    title: "World Cup Final - USA vs Brazil",
    description: "The ultimate soccer showdown in the World Cup final match.",
    sport: "Soccer",
    venue: "Rose Bowl, Pasadena",
    date: new Date('2025-11-15'),
    time: "3:00 PM",
    price: 200,
    totalSeats: 800,
    availableSeats: 800
  },
  {
    title: "Yankees vs Red Sox - Classic Rivalry",
    description: "Historic baseball rivalry game between New York Yankees and Boston Red Sox.",
    sport: "Baseball",
    venue: "Yankee Stadium, New York",
    date: new Date('2025-10-20'),
    time: "1:00 PM",
    price: 75,
    totalSeats: 600,
    availableSeats: 600
  },
  {
    title: "Wimbledon Finals",
    description: "The most prestigious tennis tournament final match.",
    sport: "Tennis",
    venue: "All England Club, London",
    date: new Date('2025-09-13'),
    time: "2:00 PM",
    price: 250,
    totalSeats: 300,
    availableSeats: 300
  },
  {
    title: "Stanley Cup Finals - Game 7",
    description: "The decisive game 7 of the Stanley Cup Finals.",
    sport: "Hockey",
    venue: "Madison Square Garden, New York",
    date: new Date('2025-10-15'),
    time: "8:00 PM",
    price: 180,
    totalSeats: 400,
    availableSeats: 400
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/sports-tickets';
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing events
    await Event.deleteMany({});
    console.log('Cleared existing events');

    // Insert sample events
    const events = await Event.insertMany(sampleEvents);
    console.log(`Inserted ${events.length} sample events`);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();