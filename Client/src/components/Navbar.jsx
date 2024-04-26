import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "../App.css";

function Navbar() {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  return (
    <>
      <header id="topHeader">
        <nav>
          <span class="logo" id="introhead">
            Learnify
          </span>
          <div class="menu-btn-3" onclick="menuBtnFunction(this)">
            <span></span>
          </div>
          <div class="mainMenu">
            <a href="#">
              <span>Home</span>
            </a>
            <a href="#">
              <span>Services</span>
            </a>
            <a href="#">
              <span>Portfolio</span>
            </a>
            <a href="#">
              <span>About Us</span>
            </a>
            <a href="#">
              <span>Career</span>
            </a>
            <a href="#">
              <span>Blog</span>
            </a>
            {isAuthenticated ? (
              <a
                href="#"
                onClick={() =>
                  logout({
                    logoutParams: { returnTo: window.location.origin },
                  })
                }
              >
                Log Out
              </a>
            ) : (
              <a href="#" onClick={() => loginWithRedirect()}>
                {" "}
                Get Started
              </a>
            )}
          </div>
        </nav>
      </header>
    </>
  );
}

export default Navbar;
