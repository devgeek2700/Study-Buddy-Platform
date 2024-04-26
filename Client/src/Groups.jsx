// Import Link from react-router-dom
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { studyGroups } from "./Data";
import RegNavbar from "./components/RegNavbar";
import { useAuth0 } from "@auth0/auth0-react";
import emailjs from "@emailjs/browser";
import "./group.css";

function Groups() {
  const { isAuthenticated, user, isLoading } = useAuth0();
  const [joinedGroups, setJoinedGroups] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      const storedJoinedGroups =
        JSON.parse(localStorage.getItem("joinedGroups")) || [];
      const userJoinedGroups = storedJoinedGroups.filter(
        (group) => group.user === user.name
      );
      setJoinedGroups(userJoinedGroups);
    }
  }, [isAuthenticated]);

  const joinGroup = (groupCode, groupName) => {
    if (isAuthenticated) {
      const joinedGroup = {
        user: user.name,
        groupCode: groupCode,
      };
      setJoinedGroups([...joinedGroups, joinedGroup]);
      localStorage.setItem(
        "joinedGroups",
        JSON.stringify([...joinedGroups, joinedGroup])
      );

      // Sending email using EmailJS
      const serviceId = "service_ky953uq";
      const templateId = "template_853kidm";
      const publicKey = "QXPr4xqIXGXKzenji";

      const templateParams = {
        user_name: user.name,
        group_name: groupName,
        group_code: groupCode,
      };

      emailjs
        .send(serviceId, templateId, templateParams, publicKey)
        .then((response) => {
          console.log("Email sent successfully!", response);
          alert("Group joined successfully! Email sent.");
        })
        .catch((error) => {
          console.error("Error sending email:", error);
          alert("Group joined successfully! Error sending email.");
        });

      // Alert message for successful group join
      alert("Group joined successfully!");
    } else {
      alert("Please login to join the group.");
    }
  };

  const isGroupJoined = (groupCode) => {
    return (
      isAuthenticated &&
      joinedGroups.some((group) => group.groupCode === groupCode)
    );
  };

  const openModal = (group) => {
    setSelectedGroup(group);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedGroup(null);
    setModalOpen(false);
  };

  return (
    <>
      <RegNavbar />

      <center id="headtxt">Explore the Study Groups...</center>

      <div className="group-joined-top">
        <div className="dropdown">
          <button
            className="dropbtn"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            Groups Joined
          </button>

          {showDropdown && (
            <div className="dropdown-content">
              {joinedGroups.map((joinedGroup, index) => (
                <Link
                  to={`/GroupDetailspage/${joinedGroup.groupCode}`}
                  key={index}
                  className="group-link"
                >
                  {
                    studyGroups.find(
                      (group) => group.GroupCode === joinedGroup.groupCode
                    )?.GroupName
                  }{" "}
                  [{joinedGroup.groupCode}]
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="container">
        {studyGroups.map((group) => (
          <div className="cards" key={group.StudyGroupId}>
            <div className="card-item">
              <div
                className="card-image"
                style={{ backgroundImage: `url(${group.ImageURL})` }}
              ></div>
              <div className="card-info">
                <h2 className="card-title">{group.GroupName}</h2>
                <div>
                  <i
                    className="fa-solid fa-eye"
                    onClick={() => openModal(group)}
                  ></i>
                </div>
                <p className="card-text">Rating: {group.Rating}</p>
                <p className="card-text">
                  Teacher Experience: {group.TeacherExperienceYears} years
                </p>
                <p className="card-text">Subject: {group.Subject}</p>
                <p className="card-text">Location: {group.Location}</p>
                {isAuthenticated && isGroupJoined(group.GroupCode) && (
                  <Link
                    to={`/GroupDetailspage/${group.StudyGroupId}`}
                    className="grpJoinedBtn"
                  >
                    {" "}
                    {/* Update the link to pass group ID */}
                    View Group
                  </Link>
                )}
                {!isGroupJoined(group.GroupCode) && (
                  <button
                    type="button"
                    className="joinGrpBtn"
                    onClick={() => joinGroup(group.GroupCode, group.GroupName)}
                  >
                    Join Group
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedGroup && modalOpen && (
  <div className="modal">
    <div className="modal-content">
      <span className="close" onClick={closeModal}>&times;</span>
      <h2>{selectedGroup.GroupName}'s Description</h2>
      <p id="DetailedDescriptiontxt">{selectedGroup.DetailedDescription}</p>
      <div className="topics">
        <h3>Topics:</h3>
        <ul>
          {selectedGroup.Topics.map((topic, index) => (
            <li key={index} id="topicLst">{topic}</li>
          ))}
        </ul>
      </div>
    </div>
  </div>
)}

    </>
  );
}

export default Groups;
