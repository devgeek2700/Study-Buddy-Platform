import React from "react";
import axios from "axios";
import "./chat.css";

const AuthPage = (props) => {
  const onSubmit = (e) => {
    e.preventDefault();
    const { value } = e.target.elements.username; 
    axios.post("http://localhost:3001/authenticate", { username: value })
      .then(r => props.onAuth({ ...r.data, secret: value }))
      .catch(e => console.log("Auth Error", e));
  };

  return (
    <>
      <div className="wrapper">
        <h3>Welcome to the Chat Group</h3>
        <form onSubmit={onSubmit}>
          <div className="rating">
            <input type="number" name="rating" hidden />
          </div>
          <input id="authchatiput" type="text" name="username" placeholder="Enter Name..." />
          <div className="btn-group">
            <button type="submit" className="btn submit">
              Enter
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AuthPage;
