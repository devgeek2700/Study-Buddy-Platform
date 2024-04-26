import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { studyGroups } from "./Data";
import "./grupdetails.css";

function GroupDetailspage() {
  const { id } = useParams();
  const group = studyGroups.find(
    (group) => group.StudyGroupId === parseInt(id)
  );
  const [enteredCode, setEnteredCode] = useState("");

  const handleJoinMeet = () => {
    const enteredGroupCode = prompt("Enter the meeting code:");
    if (enteredGroupCode === group.GroupCode) {
      window.location.href = `/JoinMeet/${id}`;
    } else {
      alert("Incorrect code entered. Please try again.");
    }
  };

  const handleJoinChat = () => {
    window.location.href = `/JoinChat?groupName=${encodeURIComponent(
      group.GroupName
    )}`;
  };

  const handleJoinTest = () => {
    window.location.href = `/Tests/${id}`;
  };

  return (
    <>
      {/* float buttion for create notes */}
      <a href="/CreateNotes" className="float" target="_blank">
        <i className="fa fa-plus my-float"></i>
      </a>

      <div className="card-wrapper">
        <div className="card">
          {/* card left */}
          <div className="product-imgs">
            <div className="img-display">
              <div className="img-showcase">
                <img
                  src={group.ImageURL}
                  className="maingropdetImg"
                  alt="group dp image"
                />
              </div>
            </div>
          </div>

          {/* card right */}
          <div className="product-content">
            <h2 className="product-title">{group.GroupName}</h2>
            <div className="product-rating">
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star-half-alt"></i>
              <span>{group.Rating}</span>
            </div>

            <div className="product-price">
              <p className="new-price">
                Subject: <span>{group.Subject}</span>
              </p>
              <p className="new-price">
                Teacher Experience:{" "}
                <span>{group.TeacherExperienceYears} years</span>
              </p>
              <p className="new-price">
                Teacher: <span>{group.TeacherName}</span>
              </p>
              <p className="new-price">
                Location: <span>{group.Location}</span>
              </p>
              <p className="new-price">
                Location: <span>{group.Location}</span>
              </p>
            </div>

            <div className="product-detail">
              <h2>About this Chat Group: </h2>
              <p>{group.DetailedDescription}</p>

              <h2>Topics will discuss in this group</h2>
              <ul>
                {group.Topics.map((topic, index) => (
                  <li key={index}>{topic}</li>
                ))}
              </ul>
            </div>

            <div className="purchase-info">
              <button type="button" className="btn" onClick={handleJoinChat}>
                Join Chat
                <i className="fa-solid fa-message btnicongrp"></i>
              </button>

              <button
                type="button"
                className="btn videocallBtn"
                id="videocallBtn"
                onClick={handleJoinMeet}
              >
                Join Meet
                <i className="fa-solid fa-video btnicongrp"></i>
              </button>

              <button
                type="button"
                className="btn"
                id="testBtn"
                onClick={handleJoinTest}
              >
                Give Test
                <i class="fa-solid fa-file btnicongrp"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default GroupDetailspage;
