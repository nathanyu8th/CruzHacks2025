import React, { useState } from 'react'
import './SignUpForm.css'
import { Link } from 'react-router-dom'
import {auth} from './firebase/firebase'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'

const SignUpForm = () => {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log("Account Created")

            const user = userCredential.user;
            await updateProfile(user, {
                displayName: username
            });
        }catch(error) {
            console.log(error)
        }
    }

    // auth.currentUser.displayName
    // auth.currentUser.email
    // auth.currentUser.uid
  return (
    <div className='signup-container'>
        <form className='signup-form' onSubmit={handleSubmit}>
            <h2>Sign-Up</h2>
            <label htmlFor='username'>
                User Name:
                <input type='text' onChange ={(e) => setUsername(e.target.value)}/>
            </label>
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