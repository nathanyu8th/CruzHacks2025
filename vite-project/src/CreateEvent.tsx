import React from 'react'
import { auth } from './firebase/firebase'
import { useState, useEffect } from 'react'

const CreateEvent = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [attending, setAttending] = useState(true);

    
  return (
    <div>CreateEvent</div>
  )
}

export default CreateEvent