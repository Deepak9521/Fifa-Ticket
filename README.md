# Sports Event Ticket Booking System

A full-stack MERN application for booking sports event tickets.

## Features

- Browse available sports events
- Book tickets for events
- View booking confirmations
- Responsive design
- Real-time seat availability

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Deployment**: Vercel (Frontend + Serverless Functions)

## Quick Start

### Prerequisites

- Node.js (v14 or higher)
- MongoDB database (local or cloud)

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd sports-event-ticket-booking
```

2. Install dependencies
```bash
npm install
cd client && npm install
```

3. Set up environment variables
```bash
cp .env.example .env
```

Edit `.env` with your MongoDB connection string:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
PORT=5000
```

4. Seed the database (optional)
```bash
npm run seed
```

5. Start development servers
```bash
# Start backend (from root directory)
npm run dev

# Start frontend (in another terminal)
npm run client
```

## Deployment

### Vercel Deployment

1. Install Vercel CLI
```bash
npm i -g vercel
```

2. Set environment variables in Vercel dashboard:
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Your JWT secret key
   - `NODE_ENV`: production

3. Deploy
```bash
vercel --prod
```

### Environment Variables

Required environment variables for production:

- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `NODE_ENV`: Set to "production"

## API Endpoints

- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get single event
- `POST /api/events` - Create new event
- `POST /api/bookings` - Create new booking
- `GET /api/bookings` - Get all bookings
- `GET /api/bookings/reference/:ref` - Get booking by reference

## Project Structure

```
├── api/                    # Serverless API functions
├── client/                 # React frontend
├── models/                 # MongoDB models
├── routes/                 # Express routes (for local dev)
├── server.js              # Express server (for local dev)
├── seed.js                # Database seeding script
└── vercel.json            # Vercel deployment config
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License