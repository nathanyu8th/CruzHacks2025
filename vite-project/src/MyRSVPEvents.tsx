import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase/firebase";
import { getDocs, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const MyRSVPEvents = () => {
  const user = auth.currentUser;
  const [myEvents, setMyEvents] = useState<EventType[]>([]);
    const navigate = useNavigate();


  useEffect(() => {
    if (!user) return;

    const fetchRSVPEvents = async () => {
      const snapshot = await getDocs(collection(db, "Events"));
      const now = new Date();

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

      const filtered = snapshot.docs
        .map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            Date: data.Date?.toDate(),
          } as EventType;
        })
        .filter(
          (event) =>
            event.RSVPUsers?.some((u) => u.uid === user.uid) &&
            event.Date &&
            event.Date >= now
        );

      setMyEvents(filtered);
    };

    fetchRSVPEvents();
  }, [user]);

  return (
    <div>
      <h2>Events I RSVPd To</h2>
      {myEvents.length === 0 ? (
        <p>You haven’t RSVPd to any events.</p>
      ) : (
        myEvents.map((event) => (
          <div key={event.id} className="event-card">
            <h3>{event.EventName}</h3>
            <p>{event.EventDescription}</p>
            <p>
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
            <p>Location: {event.Location}</p>
          </div>
        ))
      )}
      <button onClick={() => navigate("/profile")}>View My RSVPs</button>
    </div>
  );
};

export default MyRSVPEvents;