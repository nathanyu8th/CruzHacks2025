import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase/firebase";

import { useEffect } from "react";
import { collection, getDocs, query, doc, deleteDoc } from "firebase/firestore";

const Dashboard = () => {
    const navigate = useNavigate();
    const user = auth.currentUser;
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

    //get events function
    const getEvents = async () => {
        const querySnapshot = await getDocs(collection(db, "Events"));
        //const events = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
        const events = querySnapshot.docs.map((doc) => {
            const data = doc.data();
            return {
                id: doc.id,
                ...data,
                Date: data.Date?.toDate(), // Convert Firestore Timestamp to JS Date
            };
        });
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

            <div className="events-list">
                {events.length === 0 ? (
                    <p>No events found.</p>
                ) : (
                    events.map((event) => (
                        <div key={event.id} className="event-card">
                            <h3>{event.EventName}</h3>
                            <p>Username: {user.displayName}</p>
                            <p>Description: {event.EventDescription}</p>
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
                            <button>RSVP</button>
                            <button onClick={() => handleDelete(event.id)}>Delete</button>
                            <button>Edit</button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Dashboard;
