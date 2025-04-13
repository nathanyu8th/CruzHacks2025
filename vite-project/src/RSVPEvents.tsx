import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "./firebase/firebase";
import { getDocs, collection } from "firebase/firestore";
import "./MyRSVPEvents.css";

interface EventType {
  id: string;
  Date: Date;
  EventName?: string;
  EventDescription?: string;
  Location?: string;
  RSVPUsers?: { uid: string; displayName: string }[];
  // You may add more fields if needed
}

const RSVPPage: React.FC = () => {
  const navigate = useNavigate();
  const user = auth.currentUser;
  const [myEvents, setMyEvents] = useState<EventType[]>([]);
  // To track the check‑in codes for each event (by event id)
  const [checkinCodes, setCheckinCodes] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (!user) return;

    const fetchRSVPEvents = async () => {
      try {
        const snapshot = await getDocs(collection(db, "Events"));
        const now = new Date();

        const events = snapshot.docs
          .map((doc) => {
            const data = doc.data();
            const eventDate = data.Date?.toDate();
            return {
              id: doc.id,
              ...data,
              Date: eventDate,
            } as EventType;
          })
          .filter(
            (event) =>
              event.RSVPUsers?.some((u) => u.uid === user.uid) &&
              event.Date &&
              event.Date >= now
          );

        setMyEvents(events);
      } catch (error) {
        console.error("Error fetching events: ", error);
      }
    };

    fetchRSVPEvents();
  }, [user]);

  const handleCheckinInputChange = (eventId: string, value: string) => {
    setCheckinCodes((prevState) => ({
      ...prevState,
      [eventId]: value,
    }));
  };

  const handleCheckinSubmit = (eventId: string) => {
    const code = checkinCodes[eventId];
    // TODO: Add your check-in verification logic here (e.g., update Firestore)
    console.log(`Event ID: ${eventId}, Checkin Code: ${code}`);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  return (
    <div className="rsvp-wrapper">
      {/* NAVBAR */}
      <div className="navbar">
      <button className="nav-title" onClick={() => navigate("/")}>
      ganc
      </button>
      <div className="nav-buttons">
        <button className="nav-button" onClick={() => navigate("/dashboard")}>
        events
        </button>
        <button className="nav-button" onClick={() => navigate("/myrsvps")}>
        rsvps
        </button>
        <button className="nav-button" onClick={() => navigate("/create")}>
        create an event
        </button>
        <button className="nav-button" onClick={() => navigate("/profile")}>
        👤
        </button>
      </div>
    </div>

      {/* Page Title */}
      <div className="rsvp-title">
        <h1>Your RSVPS</h1>
        <p style={{ color: "black" }}>
          Upcoming events you signed up for
        </p>
      </div>

      {/* List of RSVP events */}
      <div className="rsvp-list">
        {myEvents.length === 0 ? (
          <p>You haven’t RSVPd to any events.</p>
        ) : (
          myEvents.map((event) => (
            <div className="rsvp-row" key={event.id}>
              <div className="yellow-card">
                <h2>{event.EventName || "Untitled Event"}</h2>
                {/* Using EventDescription in place of club if not provided */}
                <h4>
                  {event.EventDescription || "No description provided"}
                </h4>
                <p>{event.Location || "Location not specified"}</p>
                {event.Date && (
                  <>
                    <p>{formatDate(event.Date)}</p>
                    <p>{formatTime(event.Date)}</p>
                  </>
                )}
              </div>
              <div className="checkin-card">
                <p>
                  <strong>At the event?</strong>
                </p>
                <p>
                  Enter your <strong>check in code</strong> here to confirm your
                  attendance
                </p>
                <input
                  type="text"
                  className="code-input"
                  style={{ color: "black" }}
                  value={checkinCodes[event.id] || ""}
                  onChange={(e) =>
                    handleCheckinInputChange(event.id, e.target.value)
                  }
                />
                <button onClick={() => handleCheckinSubmit(event.id)}>
                  Submit Code
                </button>
                <p
                  className="contact-link"
                  onClick={() =>
                    console.log("Contact organizer for event id", event.id)
                  }
                >
                  Click here to contact organizer
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RSVPPage;
