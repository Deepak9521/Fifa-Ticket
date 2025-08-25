import React, { useState } from 'react';
import './BookingForm.css';

const BookingForm = ({ event, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        ticketQuantity: 1
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const totalAmount = event.price * formData.ticketQuantity;

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
        <div className="booking-container">
            <h2>Book Your Tickets</h2>

            <div className="selected-event">
                <h3>{event.title}</h3>
                <div className="event-info">
                    <p><strong>Sport:</strong> {event.sport}</p>
                    <p><strong>Venue:</strong> {event.venue}</p>
                    <p><strong>Date:</strong> {formatDate(event.date)}</p>
                    <p><strong>Time:</strong> {event.time}</p>
                    <p><strong>Price per ticket:</strong> ${event.price}</p>
                    <p><strong>Available seats:</strong> {event.availableSeats}</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="booking-form">
                <div className="form-group">
                    <label htmlFor="customerName">Full Name *</label>
                    <input
                        type="text"
                        id="customerName"
                        name="customerName"
                        value={formData.customerName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="customerEmail">Email Address *</label>
                    <input
                        type="email"
                        id="customerEmail"
                        name="customerEmail"
                        value={formData.customerEmail}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="customerPhone">Phone Number *</label>
                    <input
                        type="tel"
                        id="customerPhone"
                        name="customerPhone"
                        value={formData.customerPhone}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="ticketQuantity">Number of Tickets *</label>
                    <select
                        id="ticketQuantity"
                        name="ticketQuantity"
                        value={formData.ticketQuantity}
                        onChange={handleChange}
                        required
                    >
                        {[...Array(Math.min(10, event.availableSeats))].map((_, i) => (
                            <option key={i + 1} value={i + 1}>
                                {i + 1} {i === 0 ? 'Ticket' : 'Tickets'}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="total-section">
                    <div className="total-amount">
                        <strong>Total Amount: ${totalAmount}</strong>
                    </div>
                </div>

                <div className="form-actions">
                    <button type="button" onClick={onCancel} className="cancel-btn">
                        Cancel
                    </button>
                    <button type="submit" className="submit-btn">
                        Confirm Booking
                    </button>
                </div>
            </form>
        </div>
    );
};

export default BookingForm;