import React, { useState } from 'react';
import { auth } from './firebase/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase/firebase';
import { useNavigate } from 'react-router-dom';
import './CreateNewEvent.css';

const CreateEvent: React.FC = () => {
  // State variables for the form fields
  const [organization, setOrganization] = useState('');
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);

  const navigate = useNavigate();
  const user = auth.currentUser;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      alert('You must be logged in to create an event.');
      return;
    }

    // Combine date and time into a single Date object
    const fullDate = new Date(`${date}T${time}`);

    const newEvent = {
      EventName: eventName,
      EventDescription: eventDescription,
      Organization: organization,
      Date: fullDate,
      Username: user.displayName,
      Attendants: 0,
      Location: location,
      IsPrivate: isPrivate,
    };

    try {
      await addDoc(collection(db, 'Events'), newEvent);
    } catch (error) {
      console.error('Error creating event:', error);
    }

    navigate('/dashboard');
  };

  return (
    <div className="page-wrapper">
      {/* NAVBAR */}
      <div className="navbar">
        <div className="nav-title">ganc</div>
        <div className="nav-buttons">
          <button className="nav-button" onClick={() => navigate('/dashboard')}>
            events
          </button>
          <button className="nav-button" onClick={() => navigate('/myrsvps')}>
            rsvps
          </button>
          <button className="nav-button" onClick={() => navigate('/create')}>
            create an event
          </button>
          <button className="nav-button" onClick={() => navigate('/your-events')}>
            your events
          </button>
          <button className="nav-button profile-icon" onClick={() => navigate('/profile')}>
            👤
          </button>
        </div>
      </div>

      {/* MAIN CONTENT: CREATE EVENT FORM */}
      <div className="create-event-container">
        <h1>Create Your Event</h1>
        <form onSubmit={handleSubmit} className="create-event-form">
          <label htmlFor="organization">
            Organization (Username):
            <input
              id="organization"
              type="text"
              placeholder="Enter organization (username)"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              required
            />
          </label>

          <label htmlFor="eventName">
            Event Name:
            <input
              id="eventName"
              type="text"
              placeholder="Enter event name"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              required
            />
          </label>

          <label htmlFor="eventDescription">
            Event Description:
            <input
              id="eventDescription"
              type="text"
              placeholder="Enter event description"
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
              required
            />
          </label>

          <label htmlFor="location">
            Location:
            <input
              id="location"
              type="text"
              placeholder="Enter location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </label>

          <label htmlFor="date">
            Select Date:
            <input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </label>

          <label htmlFor="time">
            Select Time:
            <input
              id="time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </label>

          <label htmlFor="isPrivate" className="checkbox-label">
            Make this event private?
            <input
              id="isPrivate"
              type="checkbox"
              checked={isPrivate}
              onChange={(e) => setIsPrivate(e.target.checked)}
            />
          </label>

          <div className="button-container">
            <button type="submit" className="create-button">
              CREATE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;

