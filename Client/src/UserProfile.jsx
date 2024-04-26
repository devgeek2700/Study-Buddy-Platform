import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import RegNavbar from "./components/RegNavbar";
import "./User.css";

function UserProfile() {
  const { isAuthenticated, user } = useAuth0();

  return (
    <>
        {/* <RegNavbar/> */}

      <div className="home_container">
        <p id="linkpara">My Profile Information</p>

        <div className="profile-info">
          {isAuthenticated && (
            <>
              <div className="profile-picture">
                <img src={user.picture} alt="Profile"  className="userImg"/>
              </div>
              <h2 className="paratxt">
                Your Username is: <span id="username1">{user.name}</span>
              </h2>

              <h2 className="paratxt">
                Your User Mail is: <span id="username1">{user.email}</span>
              </h2>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default UserProfile;
