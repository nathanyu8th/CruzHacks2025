import React from 'react'
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebase';

const Dashboard = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate('/profile');
            } else{
                navigate('/signup');
            }
            
        })
        
    };


  return (
    <div className='home-container'>
        <div>Home</div>
        <button onClick={handleLoginClick}>Go to User Profile</button>
    </div>
  )
}

export default Dashboard