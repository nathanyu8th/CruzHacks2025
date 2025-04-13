import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ClubLanding from './ClubLanding';
import SignUpForm from './SignUpForm';
import Login from './Login';
import Dashboard from './Dashboard';
import UserProfile from './UserProfile';
import EditProfile from './EditProfile';
import CreateEvent from './CreateEvent';
import PageWrapper from './PageWrapper';
import MyRSVPEvents from './MyRSVPEvents';
import { JoinPrivate } from './JoinPrivate';

function App() {
  const [events, setEvents] = useState<any[]>([]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PageWrapper bgGradient="linear-gradient(to bottom, #ffffdf 30%, #9bcbe3 60%)">
              <ClubLanding />
            </PageWrapper>
          }
        />
        <Route
          path="/signup"
          element={
            <PageWrapper bgGradient="linear-gradient(to right, #fbc2eb, #a6c1ee)">
              <SignUpForm />
            </PageWrapper>
          }
        />
        <Route
          path="/login"
          element={
            <PageWrapper bgGradient="linear-gradient(to right, #fdfbfb, #ebedee)">
              <Login />
            </PageWrapper>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PageWrapper bgGradient="linear-gradient(to bottom, #dfe9f3, #ffffff)">
              <Dashboard />
            </PageWrapper>
          }
        />
        <Route
          path="/profile"
          element={
            <PageWrapper bgGradient="linear-gradient(to left, #ffecd2, #fcb69f)">
              <UserProfile />
            </PageWrapper>
          }
        />
        <Route
          path="/editProfile"
          element={
            <PageWrapper bgGradient="linear-gradient(to top, #a1c4fd, #c2e9fb)">
              <EditProfile />
            </PageWrapper>
          }
        />
        <Route
          path="/myrsvps"
          element={
            <PageWrapper bgGradient="linear-gradient(to top, #a1c4fd, #c2e9fb)">
              <MyRSVPEvents />
            </PageWrapper>
          }
        />
        <Route
          path="/private"
          element={
            <PageWrapper bgGradient="linear-gradient(to top, #a1c4fd, #c2e9fb)">
              <JoinPrivate />
            </PageWrapper>
          }
        />
        <Route
          path="/create"
          element={
            <PageWrapper bgGradient="linear-gradient(to top right, #fddb92, #d1fdff)">
              <CreateEvent events={events} setEvents={setEvents} />
            </PageWrapper>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
