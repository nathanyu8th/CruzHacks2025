<<<<<<< HEAD
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
<<<<<<< HEAD
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage'
import EventDashboard from './EventDashboard';
=======
import MyRSVPEvents from './MyRSVPEvents';
import { JoinPrivate } from './JoinPrivate';
>>>>>>> eaaee5cfe5ca066d70e597461c7a36b93ef943c6
=======
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ClubLanding from "./ClubLanding";
import SignUpForm from "./SignUpForm";
import Login from "./Login";
import Dashboard from "./Dashboard";
import UserProfile from "./UserProfile";
import EditProfile from "./EditProfile";
import CreateEvent from "./CreateEvent";
import PageWrapper from "./PageWrapper";
import MyRSVPEvents from "./MyRSVPEvents";
import JoinPrivate from "./JoinPrivate";
>>>>>>> 0591dd09a1dca2aae9e402ccd184ad14664c8656

function App() {
    const [events, setEvents] = useState<any[]>([]);

<<<<<<< HEAD
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
              <SignUpPage />
            </PageWrapper>
          }
        />
        <Route
          path="/login"
          element={
            <PageWrapper bgGradient="linear-gradient(to right, #fdfbfb, #ebedee)">
              <LoginPage />
            </PageWrapper>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PageWrapper bgGradient="linear-gradient(to bottom, #dfe9f3, #ffffff)">
              <EventDashboard />
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
=======
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
                            <CreateEvent
                                events={events}
                                setEvents={setEvents}
                            />
                        </PageWrapper>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
>>>>>>> 0591dd09a1dca2aae9e402ccd184ad14664c8656
}

export default App;
