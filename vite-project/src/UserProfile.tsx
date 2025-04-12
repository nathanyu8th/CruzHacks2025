import React from "react";
import { useEffect, useState } from "react";
import { auth } from "./firebase/firebase";





const UserProfile = () => {
    const [username, setUsername] = useState("");

    useEffect(() => {
        const user = auth.currentUser;
    
        if (user) {
          console.log("User ID:", user.uid);
          console.log("User Name:", user.displayName || "No name set");

          setUsername(user.displayName || "Error: No Name");
        } else {
            
          console.log("No user is signed in");
        }
      }, []);



    return (
        <div className="profile-container">
            <div className="username">User Name: {username}</div>
            <div className="user-bio">Bio: </div>
            <div className="edit-profile">
                <button>Edit Profile</button>
            </div>

        </div>
    );
};

export default UserProfile;
