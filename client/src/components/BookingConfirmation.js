import React from 'react';
import './BookingConfirmation.css';

const BookingConfirmation = ({ booking, onNewBooking }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="confirmation-container">
      <div className="confirmation-card">
        <div className="success-icon">✅</div>
        <h2>Booking Confirmed!</h2>
        <p className="success-message">
          Your tickets have been successfully booked. Please save your booking reference for future use.
        </p>

        <div className="booking-details">
          <div className="reference-section">
            <h3>Booking Reference</h3>
            <div className="reference-code">{booking.bookingReference}</div>
          </div>

          <div className="details-section">
            <h3>Event Details</h3>
            <div className="detail-grid">
              <div className="detail-item">
                <span className="label">Event:</span>
                <span>{booking.eventId.title}</span>
              </div>
              <div className="detail-item">
                <span className="label">Sport:</span>
                <span>{booking.eventId.sport}</span>
              </div>
              <div className="detail-item">
                <span className="label">Venue:</span>
                <span>{booking.eventId.venue}</span>
              </div>
              <div className="detail-item">
                <span className="label">Date:</span>
                <span>{formatDate(booking.eventId.date)}</span>
              </div>
              <div className="detail-item">
                <span className="label">Time:</span>
                <span>{booking.eventId.time}</span>
              </div>
            </div>
          </div>

          <div className="customer-section">
            <h3>Customer Information</h3>
            <div className="detail-grid">
              <div className="detail-item">
                <span className="label">Name:</span>
                <span>{booking.customerName}</span>
              </div>
              <div className="detail-item">
                <span className="label">Email:</span>
                <span>{booking.customerEmail}</span>
              </div>
              <div className="detail-item">
                <span className="label">Phone:</span>
                <span>{booking.customerPhone}</span>
              </div>
            </div>
          </div>

          <div className="ticket-section">
            <h3>Ticket Information</h3>
            <div className="detail-grid">
              <div className="detail-item">
                <span className="label">Quantity:</span>
                <span>{booking.ticketQuantity} {booking.ticketQuantity === 1 ? 'Ticket' : 'Tickets'}</span>
              </div>
              <div className="detail-item">
                <span className="label">Total Amount:</span>
                <span className="total-amount">${booking.totalAmount}</span>
              </div>
              <div className="detail-item">
                <span className="label">Status:</span>
                <span className="status confirmed">Confirmed</span>
              </div>
            </div>
          </div>
        </div>

        <div className="actions">
          <button onClick={onNewBooking} className="new-booking-btn">
            Book Another Event
          </button>
        </div>

        <div className="instructions">
          <h4>Important Instructions:</h4>
          <ul>
            <li>Please arrive at the venue at least 30 minutes before the event starts</li>
            <li>Bring a valid ID for verification</li>
            <li>Keep your booking reference handy for entry</li>
            <li>Tickets are non-refundable but can be transferred</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;