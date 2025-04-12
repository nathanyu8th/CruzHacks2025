import React from 'react'
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebase';

const Home = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate('/dashboard');
            } else{
                navigate('/signup');
            }
            
        })
        
    };


  return (
    <div className='home-container'>
        <div>Home</div>
        <button onClick={handleLoginClick}>Log In</button>
    </div>
  )
}

export default Home