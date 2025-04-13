import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EventDashboard.css";

import { auth, db } from "./firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
    collection,
    getDocs,
    doc,
    deleteDoc,
    updateDoc,
    increment,
    arrayUnion,
} from "firebase/firestore";

// use state
const EventDashboard: React.FC = () => {
    const navigate = useNavigate();
    const [events, setEvents] = useState<any[]>([]);
    const [user, setUser] = useState<any>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedEvent, setSelectedEvent] = useState<any | null>(null);

    // check auth state
    useEffect(() => {
        onAuthStateChanged(auth, (authUser) => {
            if (authUser) {
                setUser(authUser);
            } else {
                navigate("/signup");
                alert("You must be logged in to view the dashboard.");
            }
        });
    }, [navigate]);

    // load events
    const getEvents = async () => {
        const querySnapshot = await getDocs(collection(db, "Events"));
        const now = new Date();

        const eventList = querySnapshot.docs
            .map((doc) => {
                const data = doc.data();
                return {
                    id: doc.id,
                    ...data,
                    Date: data.Date?.toDate(), // convert Firestore Timestamp to JS Date
                };
            })
            .filter((event) => event.Date && event.Date >= now);

        setEvents(eventList);
    };

    useEffect(() => {
        getEvents();
    }, []);

    const handleRSVP = async (eventId: string) => {
        const eventRef = doc(db, "Events", eventId);
        await updateDoc(eventRef, {
            Attendants: increment(1),
            RSVPUsers: arrayUnion({
                uid: user.uid,
                displayName: user.displayName,
            }),
        });
        getEvents(); // refresh list
    };

    const handleDelete = async (eventId: string) => {
        await deleteDoc(doc(db, "Events", eventId));
        setEvents((prev) => prev.filter((event) => event.id !== eventId));
    };

    const handleNav = (path: string) => {
        navigate(user ? `/${path}` : "/signup");
    };

    return (
        <div className="page-wrapper">
            {/* NAVBAR */}
            <div className="navbar">
                <div className="nav-title">ganc</div>
                <div className="nav-buttons">
                    <button
                        className="nav-button"
                        onClick={() => navigate("/events")}
                    >
                        events
                    </button>
                    <button
                        className="nav-button"
                        onClick={() => navigate("/rsvps")}
                    >
                        rsvps
                    </button>
                    <button
                        className="nav-button"
                        onClick={() => navigate("/create")}
                    >
                        create an event
                    </button>
                    <button
                        className="nav-button"
                        onClick={() => navigate("/your-events")}
                    >
                        your events
                    </button>
                    <button
                        className="nav-button profile-icon"
                        onClick={() => navigate("/profile")}
                    >
                        👤
                    </button>
                </div>
            </div>

            {/* WELCOME SECTION */}
            <div className="welcome-section">
                <h1>
                    Welcome
                    <h1>
                    {" "}
                    <span className="highlight">
                        {user?.displayName || "there"}!
                    </span>
                    </h1>
                </h1>
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="search for an event"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <span className="search-icon">🔍</span>
                </div>
            </div>

            {/* EVENT CARDS */}
            <div className="event-grid">
                {events.length === 0 ? (
                    <p>No events found.</p>
                ) : (
                    events
                        .filter((event) =>
                            [
                                event.EventName,
                                event.EventDescription,
                                event.Location,
                            ].join("").toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .map((event) => (
                            <div className="event-card" key={event.id}>
                                <h3>{event.EventName}</h3>
                                <p className="club">
                                    {event.ClubName || "Unknown Club"}
                                </p>
                                <p>{event.Location}</p>
                                <p>
                                    {event.Date?.toLocaleString("en-US", {
                                        weekday: "short",
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                        hour: "numeric",
                                        minute: "2-digit",
                                    })}
                                </p>
                                <p>Attendees: {event.Attendants || 0}</p>

                                <div style={{ marginTop: "0.75rem" }}>
                                    <button
                                        disabled={event.RSVPUsers?.some(
                                            (u) => u.uid === user?.uid
                                        )}
                                        onClick={() => handleRSVP(event.id)}
                                        className="rsvp-button"
                                    >
                                        RSVP
                                    </button>
                                    <button
                                        onClick={() => setSelectedEvent(event)}
                                        className="info-button"
                                    >
                                        Info
                                    </button>
                                </div>
                            </div>
                        ))
                )}
            </div>
            {selectedEvent && (
                <div className="modal-backdrop" onClick={() => setSelectedEvent(null)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>{selectedEvent.EventName}</h2>
                        <p><strong>Hosted by: </strong>{selectedEvent.ClubName || 'Unknown Club'}</p>
                        <p>{selectedEvent.EventDescription || 'No description provided.'}</p>
                        <p><strong>Location:</strong> {selectedEvent.Location || 'TBD'}</p>
                        <p><strong>Date:</strong> {selectedEvent.Date?.toLocaleString("en-US", {
                                        weekday: "short",
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                        hour: "numeric",
                                        minute: "2-digit",
                                    }) || 'TBA'}</p>
                    
                        <button onClick={() => setSelectedEvent(null)} className="close-button">
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EventDashboard;
