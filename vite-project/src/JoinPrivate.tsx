// JoinPrivate.tsx
import React, { useState } from "react";
import { auth, db } from "./firebase/firebase";
import { collection, getDocs, doc, updateDoc, increment, arrayUnion } from "firebase/firestore";
import { User } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const JoinPrivate = () => {
  const [code, setCode] = useState("");
  const [event, setEvent] = useState<any | null>(null);
  const [error, setError] = useState("");

  const [events, setEvents] = useState<any[]>([]);

  const user = auth.currentUser;
    const navigate = useNavigate();
    if (!user) {
        navigate("/signup");
        alert("You must be logged in to create an event.");
        
        return;
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
    IsPrivate?: boolean;
    };

    const handleRSVP = async (id) => {

        const eventRef = doc(db, "Events", id);
        await updateDoc(eventRef, {
            Attendants: increment(1),
            RSVPUsers: arrayUnion({
                uid: user.uid,
                displayName: user.displayName,
                }),
        });
        getEvents()
        //setRSVPEvent(true)
    }

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setEvent(null);

    const snapshot = await getDocs(collection(db, "Events"));

    const events: EventType[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        Date: doc.data().Date?.toDate(),
    }));

    const matchedEvent = events.find((event) => event.IsPrivate && event.id === code);

    if (matchedEvent) {
        setEvent(matchedEvent);
    } else {
        setError("No event found with that access code.");
    }
  };

  return (
    <div>
      <h2>Join a Private Event</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter Access Code"
        />
        <button type="submit">Join</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {event && (
        <div className="event-card">
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
            <button onClick={() => navigate("/dashboard")}>
                Go Back to Dashboard
            </button>
        </div>
        
      )}
    </div>
  );
};

export default JoinPrivate;

