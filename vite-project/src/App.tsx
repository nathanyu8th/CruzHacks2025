import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Dashboard from './Dashboard';
import Home from './Home';
import SignUpForm from './SignUpForm';
import Login from './Login';
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {

  return (
    
    <BrowserRouter>
    <Routes>
<<<<<<< HEAD
      <Route path="/" element={<Home />} />
=======
      <Route path='/' element={<Home />}></Route>
>>>>>>> 49c56205c7f5c9c798a3609e0b00a038a3c5b064
      <Route path='/signup' element={<SignUpForm />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/dashboard' element={<Dashboard />}></Route>
    </Routes>
    </BrowserRouter>
  
  );
}


// <div className="App">
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src="/vite.svg" className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://reactjs.org" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </div>
export default App
