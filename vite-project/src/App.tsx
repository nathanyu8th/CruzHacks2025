import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Dashboard from './Dashboard';
import Home from './Home';
import SignUpForm from './SignUpForm';
import Login from './Login';
import UserProfile from './UserProfile';
import CreateEvent from './CreateEvent';
import EditProfile from './EditProfile';
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  const [events, setEvents] = useState<any[]>([]);
  return (
    
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/signup' element={<SignUpForm />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/dashboard' element={<Dashboard />}></Route>
      <Route path='/profile'element={<UserProfile />}></Route>
      <Route path='/editProfile'element={<EditProfile />}></Route>
      <Route path='/create'element={<CreateEvent events={events} setEvents={setEvents}/>}></Route>
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
