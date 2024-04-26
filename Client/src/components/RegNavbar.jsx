import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "../App.css";

function RegNavbar() {
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
            <a href="/">
              <span>Home</span>
            </a>
            <a href="/Groups">
              <span>Chats Groups</span>
            </a>
            <a href="/ShareNotes">
              <span>Notes</span>
            </a>
            <a href="/UserProfile">
              <span>User</span>
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

export default RegNavbar;
