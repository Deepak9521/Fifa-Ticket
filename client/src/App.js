import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import EventList from './components/EventList';
import BookingForm from './components/BookingForm';
import BookingConfirmation from './components/BookingConfirmation';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function App() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentView, setCurrentView] = useState('events'); // events, booking, confirmation
  const [bookingData, setBookingData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${API_URL}/events`);
      setEvents(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching events:', error);
      setLoading(false);
    }
  };

  const handleEventSelect = (event) => {
    setSelectedEvent(event);
    setCurrentView('booking');
  };

  const handleBookingSubmit = async (formData) => {
    try {
      const response = await axios.post(`${API_URL}/bookings`, {
        eventId: selectedEvent._id,
        ...formData
      });
      setBookingData(response.data);
      setCurrentView('confirmation');
      // Refresh events to update available seats
      fetchEvents();
    } catch (error) {
      console.error('Error creating booking:', error);
      alert(error.response?.data?.message || 'Booking failed. Please try again.');
    }
  };

  const handleBackToEvents = () => {
    setCurrentView('events');
    setSelectedEvent(null);
    setBookingData(null);
  };

  if (loading) {
    return (
      <div className="App">
        <div className="loading">Loading events...</div>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>🏟️ Sports Event Tickets</h1>
        <p>Book your tickets for upcoming sports events</p>
      </header>

      <main className="App-main">
        {currentView === 'events' && (
          <EventList 
            events={events} 
            onEventSelect={handleEventSelect} 
          />
        )}

        {currentView === 'booking' && (
          <BookingForm 
            event={selectedEvent}
            onSubmit={handleBookingSubmit}
            onCancel={handleBackToEvents}
          />
        )}

        {currentView === 'confirmation' && (
          <BookingConfirmation 
            booking={bookingData}
            onNewBooking={handleBackToEvents}
          />
        )}
      </main>
    </div>
  );
}

export default App;
