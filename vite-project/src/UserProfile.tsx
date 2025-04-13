import React from "react";
import { useEffect, useState } from "react";
import { auth, db } from "./firebase/firebase";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { doc, collection, getDocs, deleteDoc } from "firebase/firestore";





const UserProfile = () => {
    const [username, setUsername] = useState("");
    const navigate = useNavigate();
    const [events, setEvents] = useState<any[]>([]);

    const [expandedEventId, setExpandedEventId] = useState<string | null>(null);
    

    const user = auth.currentUser;

    if (!user) {
        navigate("/signup");
        alert("You must be logged in to create an event.");
        
        return;
    }

    const handleDelete = id => {
        deleteDoc(doc(db, "Events", id));
        const eventsCopy = events.filter(event => event.id !== id)
        setEvents(eventsCopy)
    }

    useEffect(() => {
        const user = auth.currentUser;

        
    
        if (user) {
          //console.log("User ID:", user.uid);
          //console.log("User Name:", user.displayName || "No name set");

          setUsername(user.displayName || "Error: No Name");
        } else {
            
          //console.log("No user is signed in");
        }

        getEvents();
      }, []);

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
        
        const getEvents = async () => {
            const querySnapshot = await getDocs(collection(db, "Events"));
            const now = new Date();
            const events: EventType[] = querySnapshot.docs.map((doc) => {
                const data = doc.data();
                return {
                    id: doc.id,
                    ...data,
                    Date: data.Date?.toDate(), // Convert Firestore Timestamp to JS Date
                } as EventType;
            }).filter((event) => event.Username === user.displayName);
            
            setEvents(events);
            //console.log(events);
        };

        const toggleRSVP = (eventId: string) => {
            setExpandedEventId((prev) => (prev === eventId ? null : eventId));
        };

    return (
        <div className="profile-container">
            <div className="username">User Name: {username}</div>
            <div className="user-bio">Bio: </div>
            <div className="edit-profile">
            <button onClick={() => handleLoginClick("myrsvps")}>View My RSVPs</button>

                <button onClick={() => handleLoginClick("dashboard")}>
                    Dashboard
                </button>
            </div>

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
                            <button onClick={() => toggleRSVP(event.id)}>
                                {expandedEventId === event.id ? "Hide RSVP'd Users" : "Show RSVP'd Users"}
                            </button>

                            {expandedEventId === event.id && (
                                event.RSVPUsers && event.RSVPUsers.length > 0 ? (
                                    <ul>
                                        {event.RSVPUsers.map((user, index) => (
                                            <li key={index}>{user.displayName}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>No RSVPs yet.</p>
                                )
                            )} 
                            <button onClick={() => handleDelete(event.id)}>Delete</button>
                        </div>
                    ))
                )}
            </div>

        </div>
    );
};

export default UserProfile;
