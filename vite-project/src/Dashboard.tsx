import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase/firebase";

import { useEffect } from "react";
import { collection, arrayUnion, getDocs, query, doc, deleteDoc, updateDoc, increment } from "firebase/firestore";

const Dashboard = () => {
    const navigate = useNavigate();
    const user = auth.currentUser;
    const [rsvpEvent, setRSVPEvent] = useState(false);
    

    if (!user) {
        navigate("/signup");
        alert("You must be logged in to create an event.");
        
        return;
    }

    const [events, setEvents] = useState<any[]>([]);

    //handles buttons going to diff places
    const handleLoginClick = (address) => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate(`/${address}`);
            } else {
                navigate("/signup");
            }
        });
    };

    const handleDelete = id => {
        deleteDoc(doc(db, "Events", id));
        const eventsCopy = events.filter(event => event.id !== id)
        setEvents(eventsCopy)
    }

    const handleRSVP = async (id) => {

        const eventRef = doc(db, "Events", id);
        await updateDoc(eventRef, {
            Attendants: increment(1),
            RSVPUsers: arrayUnion({
                uid: user.uid,
                displayName: user.displayName,
              }),
        });
        
        getEvents();
        setRSVPEvent(true)
    }

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

    //get events function
    const getEvents = async () => {
        const querySnapshot = await getDocs(collection(db, "Events"));
        const now = new Date();
        const events: EventType[] = querySnapshot.docs.map((doc) => {
            const data = doc.data();
            return {
              id: doc.id,
              ...data,
              Date: data.Date?.toDate(),
            } as EventType;
          }).filter((event) => event.Date && event.Date >= now && !event.IsPrivate);

        setEvents(events);
        console.log(events);
    };

    useEffect(() => {
        getEvents();
    }, []);

    return (
        <div className="home-container">
            <div>Home</div>
            <button onClick={() => handleLoginClick("profile")}>
                Go to User Profile
            </button>
            <button onClick={() => handleLoginClick("create")}>
                Create A New Event!
            </button>
            <button onClick={() => handleLoginClick("private")}>
                Join a Private Event!
            </button>

            <div className="events-list">
                {events.length === 0 ? (
                    <p>No events found.</p>
                ) : (
                    events.map((event) => (
                        <div key={event.id} className="event-card">
                            <h3>{event.EventName}</h3>
                            <p>Organization: {event.Organization}</p>
                            <p>Description: {event.EventDescription}</p>
                            <p>Attendees: {event.Attendants}</p>
                            <p>Location: {event.Location}</p>
                            <p>
                                {" "}
                                Date:{" "}
                                {event.Date?.toLocaleString("en-US", {
                                    weekday: "short",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                    hour: "numeric",
                                    minute: "2-digit",
                                })}
                            </p>
                            <button disabled={event.RSVPUsers?.some(u => u.uid === user.uid)} onClick={() => handleRSVP(event.id)}>RSVP</button>
                            <button onClick={() => handleDelete(event.id)}>Delete</button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Dashboard;
