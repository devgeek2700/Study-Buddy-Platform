import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import herobgstudy from '../Images/herobgstudy.png';
import "../App.css";

function Hero() {
  const { isAuthenticated, user } = useAuth0();
  const navigate = useNavigate();

  // const handleGetStarted = () => {
  //   if (user.email && user.email.includes("@teacher.com")) {
  //     navigate("/TeacherTest"); // Redirect to TeacherTest.jsx
  //   } else {
  //     navigate("/Groups"); // Redirect to Groups.jsx
  //   }
  // };
  const handleGetStarted = () => {
      navigate("/Groups");
  };

  return (
    <div>
      <section id="intro">
        <div id="intro-info">
          <div>
            {isAuthenticated && (
              <>
                <p id="usernameauth">Welcome, {user.name}</p>
              </>
            )}

            <h1 id="introhead">Elevate Learning Online</h1>
            <div id="intro-tag-btn">
              <span>
                Unlock your potential from anywhere with our innovative virtual
                learning platform.
              </span>

              {isAuthenticated && (
                <>
                  <button onClick={handleGetStarted} className="brand-btn">
                    Get Started
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        <div id="development-img" className="animated-image">
          <img
            src={herobgstudy}
            alt="Mobile App Development"
            title="Mobile App Development"
          />
        </div>
      </section>
    </div>
  );
}

export default Hero;
