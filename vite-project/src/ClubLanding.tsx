import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ClubLanding.css';

const ClubLanding: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* NAVBAR */}
      <div className="navbar">
        <div className="nav-title">ganc</div>
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
      <div className="about-section">
      <h2>About ganc</h2>
        <p>
          ganc is your go-to platform for making club management easier, smarter, and more fun. 
          We empower student leaders and organizers with intuitive tools to streamline communication, 
          handle RSVPs, manage events, and keep track of attendance. Whether you're running a coding club, 
          a dance team, or an academic org, ganc gives you superpowers (and a friendly slug for good luck).
        </p>
        <p>
          Our mission is to bring clarity to chaos and help you foster vibrant, engaged communities—without the spreadsheet headaches.
        </p>
      </div>
    </div>
  );
};

export default ClubLanding;

