import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase/firebase";

import { useEffect } from "react";
import { collection, getDocs, query } from "firebase/firestore";

const Dashboard = () => {
    const navigate = useNavigate();

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
        // events.forEach((event) => {
        //     //console.log(doc.id, "=>", doc.data());
        //     //const jsDate = event.Date.toDate();
        // });
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
                            <p>Username: {event.Username}</p>
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
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Dashboard;
