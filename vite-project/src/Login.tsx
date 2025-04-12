import React, { useState } from 'react'
import './SignUpForm.css'
import { Link } from 'react-router-dom'
import {auth} from './firebase/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log("Login Successful")
        }catch(error) {
            console.log(error)
        }
    }

    const navigate = useNavigate();

  return (
    <div className='signup-container'>
        <button onClick={function(){navigate('/')}} style={{ position: 'absolute', top: '10px', left: '10px' }}>
        Back
        </button>
        <form className='signup-form' onSubmit={handleSubmit}>
            <h2>Login</h2>
            <label htmlFor='email'>
                Email:
                <input type='text' onChange ={(e) => setEmail(e.target.value)}/>
            </label>
            <label htmlFor='password'>
                Password:
                <input type='text' onChange ={(e) => setPassword(e.target.value)}/>
            </label>
            <button type='submit' onClick={() => navigate('/dashboard')}>Log In</button> <br />
            <p>Don't Have Account? <Link to="/signup">Sign up Here</Link></p>
        </form>
    </div>
  )
}

export default Login