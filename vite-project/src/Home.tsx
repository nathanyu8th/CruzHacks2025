import React from 'react'
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebase';

const Home = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        const user = auth.currentUser;
        if (user) {
          navigate('/dashboard');
        } else {
          navigate('/signup');
        }
    };
      


  return (
    <div className='home-container'>
        <h1 className="heading">Home</h1>
        <button onClick={handleLoginClick}>Log In</button>
    </div>
  )
}

export default Home