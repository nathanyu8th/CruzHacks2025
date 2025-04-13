import React from "react";
import { auth } from "./firebase/firebase";
import { useState, useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { db } from "./firebase/firebase";
import { useNavigate } from "react-router-dom";


const CreateEvent = ({events, setEvents}) => {
    //const [name, setName] = useState("");
    const [organization, setOrganization] = useState("");
    const [eventDescription, setEventDescription] = useState("");
    const [eventName, setEventName] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [location, setLocation] = useState("");
    const [isPrivate, setIsPrivate] = useState(false);

    const navigate = useNavigate();

    

    const user = auth.currentUser;
    //const [attending, setAttending] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            alert("You must be logged in to create an event.");
            return;
        }
        // Combine date and time into a single JS Date
        const fullDate = new Date(`${date}T${time}`);
        const newEvent = {
            EventName: eventName,
            EventDescription: eventDescription,
            Organization: organization,
            Date: fullDate,
            Username: user.displayName,
            Attendants: 0,
            Location: location,
            IsPrivate: isPrivate
        };

        
        
        //add new event to db

        try {
            await addDoc(collection(db, "Events"), {
                ...newEvent
            })
        }catch (error) {
            console.log(error);
        }
        console.log(events)
        console.log("Selected Date:", fullDate);

        navigate("/dashboard");
        
    };
    

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="eventName">
                Organization (Username):
                <input
                    type="text"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                />
            </label>
            <label htmlFor="eventName">
                Event Name:
                <input
                    type="text"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                />
            </label>
            <label htmlFor="eventName">
                Event Description:
                <input
                    type="text"
                    value={eventDescription}
                    onChange={(e) => setEventDescription(e.target.value)}
                />
            </label>
            <label htmlFor="eventName">
                Location:
                <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
            </label>
            <label>
                Select Date:
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
            </label>
            <br />
            <label>
                Select Time:
                <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                />
            </label>
            <label>
                Make this event private?
                <input
                    type="checkbox"
                    checked={isPrivate}
                    onChange={(e) => setIsPrivate(e.target.checked)}
                />
            </label>
            <br />
            <button type="submit">Submit</button>
        </form>
    );
};

export default CreateEvent;
