import React, { useState } from 'react'
import './SignUpForm.css'
import { Link } from 'react-router-dom'
import {auth} from './firebase/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';

const SignUpForm = () => {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            console.log("Account Created")
        }catch(error) {
            console.log(error)
        }
    }

    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate('/');
    };

  return (
    <div className='signup-container'>
    <button onClick={handleBackClick} style={{ position: 'absolute', top: '10px', left: '10px' }}>
    Back
    </button>
        <form className='signup-form' onSubmit={handleSubmit}>
            <h2>Sign-Up</h2>
            <label htmlFor='email'>
                Email:
                <input type='text' onChange ={(e) => setEmail(e.target.value)}/>
            </label>
            <label htmlFor='password'>
                Password:
                <input type='text' onChange ={(e) => setPassword(e.target.value)}/>
            </label>
            <button type='submit'>Sign Up</button> <br />
            <p>Already Registered? <Link to="/login">Login</Link></p>
        </form>
    </div>
  )
}

export default SignUpForm