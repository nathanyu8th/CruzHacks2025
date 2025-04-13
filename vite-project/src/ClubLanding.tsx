import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ClubLanding.css';

const ClubLanding: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* NAVBAR */}
      <div className="navbar">
      <button className="nav-title" onClick={() => navigate("/")}>
      ganc
      </button>
      <div className="nav-buttons">
          {/* <button className="nav-button" onClick={() => navigate('/about')}>about</button> */}
          <button className="nav-button" onClick={() => navigate('/signup')}>get started</button>
          <button className="nav-button" onClick={() => navigate('/login')}>login</button>
        </div>
    </div>

      {/* MAIN SECTION */}
      <div className="club-container">
        <div className="club-left">
          <h1 className="club-title">
            Run Your Club <br /> Like a Slug
          </h1>
          <p className="club-desc">
            Club management doesn’t have to be chaotic. Our all-in-one platform helps you glide
            through attendance tracking, events, and engagement—so you can focus on what matters.
            Purposeful, easy, and just the right amount of slime.
          </p>
        </div>

        <div className="club-right">
          <img src="/images/studiousSlug.png" alt="Studious Slug" />
        </div>
      </div>
      
    </div>
  );
};

export default ClubLanding;

