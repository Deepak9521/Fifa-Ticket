# MERN Stack Sports Ticket Booking - Setup Instructions

## Current Status
✅ Backend and Frontend are properly separated  
✅ Database is seeded with sample events  
✅ API is working and returning events  

## How to Run the Application

### 1. Start the Backend Server (Terminal 1)
```bash
# In the root directory (D:\WORK\Expence Trecker)
npm run dev
```
This starts the Express server on **http://localhost:5000**

### 2. Start the Frontend React App (Terminal 2)
```bash
# Navigate to client directory
cd client
npm start
```
This starts the React app on **http://localhost:3000** or **http://localhost:3001**

### 3. Access the Application
- Open your browser and go to the React app URL (usually http://localhost:3000 or 3001)
- You should see the Sports Event Tickets homepage
- The app will automatically fetch events from the backend API

## API Endpoints (Backend - Port 5000)
- `GET /api/events` - Get all events
- `POST /api/bookings` - Create a booking
- `GET /api/bookings/reference/:ref` - Get booking by reference

## Troubleshooting

### If no events are showing:
1. Make sure backend server is running on port 5000
2. Check browser console for errors
3. Verify API is working: http://localhost:5000/api/events

### If you see connection errors:
1. Ensure both servers are running
2. Check if ports 3000/3001 and 5000 are available
3. Refresh the browser page

## Sample Events Available:
- 🏀 Lakers vs Warriors (Basketball) - $150
- 🏈 Super Bowl LVIX (Football) - $300  
- ⚽ World Cup Final (Soccer) - $200
- ⚾ Yankees vs Red Sox (Baseball) - $75
- 🎾 Wimbledon Finals (Tennis) - $250
- 🏒 Stanley Cup Finals (Hockey) - $180

## Project Structure:
```
sports-ticket-booking/
├── server.js              # Backend Express server
├── models/               # MongoDB models
├── routes/               # API routes
├── client/               # React frontend app
│   ├── src/
│   │   ├── components/   # React components
│   │   └── App.js       # Main App component
└── package.json         # Backend dependencies
```