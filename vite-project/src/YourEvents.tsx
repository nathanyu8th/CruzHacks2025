import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "./firebase/firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import "./YourEvents.css";

type EventType = {
  id: string;
  Date: Date;
  Username?: string;
  EventName?: string;
  EventDescription?: string;
  Attendants?: number;
  Location?: string;
  RSVPUsers?: { uid: string; displayName: string }[];
  SignInUsers?: string[];
  IsPrivate: boolean;
};

const IMAGE_URL = "/images/slugPin.png";

const YourEvents: React.FC = () => {
  const navigate = useNavigate();
  const user = auth.currentUser;
  const [events, setEvents] = useState<EventType[]>([]);
  const [expandedEventId, setExpandedEventId] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      navigate("/signup");
      alert("You must be logged in to view your events.");
      return;
    }

    const getEvents = async () => {
      const querySnapshot = await getDocs(collection(db, "Events"));
      const fetchedEvents: EventType[] = querySnapshot.docs
        .map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            Date: data.Date?.toDate(),
          } as EventType;
        })
        .filter((event) => event.Username === user.displayName);
      setEvents(fetchedEvents);
    };

    getEvents();
  }, [user, navigate]);

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "Events", id));
    setEvents(events.filter((event) => event.id !== id));
  };

  const toggleRSVP = (eventId: string) => {
    setExpandedEventId((prev) => (prev === eventId ? null : eventId));
  };

  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const formatTime = (date: Date) =>
    date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });

  return (
    <div className="dashboard-wrapper">
      {/* NAVBAR */}
      <div className="navbar">
        <div className="nav-title">ganc</div>
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

      {/* MAIN CONTENT */}
      <div className="content-wrapper">
        {/* LEFT SECTION: Scrollable list of event tiles */}
        <div className="left-section">
          <div className="scrollable-events">
            {events.length === 0 ? (
              <p>No events found.</p>
            ) : (
              events.map((evt) => {
                const formattedDate = evt.Date ? formatDate(evt.Date) : "No Date";
                const formattedTime = evt.Date ? formatTime(evt.Date) : "No Time";
                return (
                  <div className="event-container" key={evt.id}>
                    <div className="big-yellow-box">
                      {/* "x" delete icon at the top-right */}
                      <button
                        className="delete-icon"
                        onClick={() => handleDelete(evt.id)}
                      >
                        x
                      </button>
                      <h2>{evt.EventName || "Untitled Event"}</h2>
                      <h4>
                        {evt.EventDescription || "No description provided"}
                      </h4>
                      <p>{evt.Location || "No location specified"}</p>
                      <p>{formattedDate}</p>
                      <p>{formattedTime}</p>
                    </div>
                    <div className="tiles-row">
                      <div className="tile">Generate code</div>
                      <div className="tile" onClick={() => toggleRSVP(evt.id)}>
                        Attendance stats
                      </div>
                    </div>
                    {expandedEventId === evt.id && (
                      <div className="attendance-popup">
                        {evt.RSVPUsers && evt.RSVPUsers.length > 0 ? (
                          <div>
                            <p>Attendees ({evt.RSVPUsers.length}):</p>
                            <ul>
                              {evt.RSVPUsers.map((rsvp, index) => (
                                <li key={index}>{rsvp.displayName}</li>
                              ))}
                            </ul>
                          </div>
                        ) : (
                          <p>No RSVPs yet.</p>
                        )}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* RIGHT SECTION: Heading, subheading, and a placeholder image */}
        <div className="right-section">
          <div className="right-heading">
            <h1>Your Events</h1>
            <p className="subheading">Events you have posted</p>
          </div>
          <div className="image-container">
            {IMAGE_URL ? (
              <img
                className="placeholder-image"
                src={IMAGE_URL}
                alt="Event"
              />
            ) : (
              <div className="placeholder-text">placeholder</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourEvents;
