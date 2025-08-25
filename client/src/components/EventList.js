import React from 'react';
import './EventList.css';

const EventList = ({ events, onEventSelect }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getSportEmoji = (sport) => {
    const emojis = {
      'Football': '🏈',
      'Basketball': '🏀',
      'Baseball': '⚾',
      'Soccer': '⚽',
      'Tennis': '🎾',
      'Hockey': '🏒'
    };
    return emojis[sport] || '🏟️';
  };

  return (
    <div className="events-container">
      <h2>Available Events</h2>
      {events.length === 0 ? (
        <p className="no-events">No upcoming events available.</p>
      ) : (
        <div className="events-grid">
          {events.map(event => (
            <div key={event._id} className="event-card">
              <div className="event-header">
                <span className="sport-emoji">{getSportEmoji(event.sport)}</span>
                <span className="sport-name">{event.sport}</span>
              </div>
              
              <h3 className="event-title">{event.title}</h3>
              <p className="event-description">{event.description}</p>
              
              <div className="event-details">
                <div className="detail-item">
                  <span className="label">📍 Venue:</span>
                  <span>{event.venue}</span>
                </div>
                
                <div className="detail-item">
                  <span className="label">📅 Date:</span>
                  <span>{formatDate(event.date)}</span>
                </div>
                
                <div className="detail-item">
                  <span className="label">🕐 Time:</span>
                  <span>{event.time}</span>
                </div>
                
                <div className="detail-item">
                  <span className="label">💰 Price:</span>
                  <span className="price">${event.price}</span>
                </div>
                
                <div className="detail-item">
                  <span className="label">🎫 Available:</span>
                  <span className={event.availableSeats < 10 ? 'low-seats' : ''}>
                    {event.availableSeats} seats
                  </span>
                </div>
              </div>
              
              <button 
                className="book-button"
                onClick={() => onEventSelect(event)}
                disabled={event.availableSeats === 0}
              >
                {event.availableSeats === 0 ? 'Sold Out' : 'Book Tickets'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventList;