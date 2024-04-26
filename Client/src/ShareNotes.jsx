import React, { useState, useEffect } from "react";
import RegNavbar from "./components/RegNavbar";
import { useAuth0 } from "@auth0/auth0-react";
import "./sharenotes.css";

function ShareNotes() {
  const { isAuthenticated, user } = useAuth0();
  const [fileName, setFileName] = useState("");
  const [fileData, setFileData] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    creditsRequired: "",
  });
  const [cards, setCards] = useState([]);
  const [creditPoints, setCreditPoints] = useState(0); // Default credit points

  useEffect(() => {
    // Retrieve cards data from localStorage
    const savedCards = localStorage.getItem("cards");
    if (savedCards) {
      setCards(JSON.parse(savedCards));
    }

    // Retrieve total credit points for the current user from localStorage
    const userCreditPoints = localStorage.getItem(user?.name);
    if (userCreditPoints) {
      setCreditPoints(parseInt(userCreditPoints));
    } else {
      // If user data is not present, set default credit points and save in localStorage
      setCreditPoints(100);
      localStorage.setItem(user?.name, "100");
    }
  }, [user]);

  const handleButtonClick = () => {
    document.getElementById("fileID").click();
    // Don't show the popup form immediately
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFileName(selectedFile.name);

    // Read the file data
    const reader = new FileReader();
    reader.onload = (event) => {
      const fileDataURL = event.target.result; // File data URL
      setFileData(fileDataURL);

      // Now show the popup form
      setShowPopup(true);

      // Store uploading user's name and file data in localStorage
      localStorage.setItem("userName", user.name);
      localStorage.setItem("uploadedFile", fileDataURL);
    };

    // Read the file as data URL
    reader.readAsDataURL(selectedFile);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if input fields are filled
    if (formData.title && formData.creditsRequired && fileName) {
      // Handle form submission here
      const newCard = {
        title: formData.title,
        creditsRequired: formData.creditsRequired,
        userName: localStorage.getItem("userName"), // Retrieve user name from localStorage
        fileName: fileName,
        fileData: fileData, // Include file data in the card
      };
      const updatedCards = [...cards, newCard];
      setCards(updatedCards);
      // Save updated cards data to localStorage
      localStorage.setItem("cards", JSON.stringify(updatedCards));

      // Update and save total credit points for the current user
      const updatedCreditPoints = creditPoints + 5;
      setCreditPoints(updatedCreditPoints);
      localStorage.setItem(user?.name, updatedCreditPoints.toString());

      setFormData({ title: "", creditsRequired: "" });
      setFileName(""); // Clear the file name after submission
      setFileData(""); // Clear the file data after submission
      closePopup();
    } else {
      // Show error message or prevent form submission
      console.log("Please fill all input fields and upload a file");
    }
  };

  const handleRemove = (index) => {
    const updatedCards = [...cards];
    updatedCards.splice(index, 1);
    setCards(updatedCards);
    localStorage.setItem("cards", JSON.stringify(updatedCards));

    // Subtract 5 credits from the total credit points for the current user
    const updatedCreditPoints = creditPoints - 5;
    setCreditPoints(updatedCreditPoints);
    localStorage.setItem(user?.name, updatedCreditPoints.toString());
  };

  const handleBuy = (index) => {
    const selectedCard = cards[index];
    const creditsRequired = parseInt(selectedCard.creditsRequired);
    if (creditsRequired <= creditPoints) {
      // Sufficient credits to buy
      const updatedCreditPoints = creditPoints - creditsRequired;
      setCreditPoints(updatedCreditPoints);
      localStorage.setItem(user?.name, updatedCreditPoints.toString());

      // Change button text to Download
      const updatedCards = [...cards];
      updatedCards[index].bought = true;
      setCards(updatedCards);
      localStorage.setItem("cards", JSON.stringify(updatedCards));

      // Show alert message
      alert("You have successfully bought the notes!");
    } else {
      // Insufficient credits
      alert("Insufficient credit points to buy this note!");
    }
  };

  const handleDownload = (index) => {
    const selectedCard = cards[index];
    const fileDataURL = localStorage.getItem("uploadedFile");
    if (fileDataURL) {
      const downloadLink = document.createElement("a");
      downloadLink.href = fileDataURL; // Set the URL of the file to download
      downloadLink.download = selectedCard.fileName; // Set the filename for the downloaded file
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } else {
      console.error("File data not found in localStorage.");
      // Handle error or show a message to the user
    }
  };

  return (
    <>
      <RegNavbar />

      <div className="upladtxt">
        {user && <h1>Uploading User: {user.name}</h1>}
        <h1>Credit Points: {creditPoints}</h1>
      </div>

      <div className="containershare">
        <div className="cardshare">
          <h3>Upload Files</h3>
          <div className="drop_box">
            <header>
              <h4>Select File here</h4>
            </header>
            <p>Files Supported: PDF, TEXT, DOC, DOCX</p>
            <input
              type="file"
              hidden
              accept=".doc,.docx,.pdf"
              id="fileID"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            <button className="btn" onClick={handleButtonClick}>
              Choose File
            </button>
            {fileData}
          </div>
        </div>
      </div>

      {/* Popup form */}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <span className="close-popup" onClick={closePopup}>
              &times;
            </span>
            <h2>Create Project</h2>
            <form onSubmit={handleSubmit}>
              <div className="inputBox">
                <label htmlFor="title">Notes Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Enter Title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </div>
              <div className="inputBox">
                <label htmlFor="creditsRequired">Credits Required</label>
                <input
                  type="text"
                  id="creditsRequired"
                  name="creditsRequired"
                  placeholder="Enter Credits Required"
                  value={formData.creditsRequired}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      creditsRequired: e.target.value,
                    })
                  }
                />
              </div>
              <input type="submit" value="Create" className="CreateFmbtn" />
            </form>
          </div>
        </div>
      )}

      {/* Render created cards */}
      <div className="container">
        {cards.map((card, index) => (
          <div className="cards" key={index}>
            <div className="card-item">
              {/* Display PDF file */}
              <div>
                <img
                  src="https://cdn-icons-png.freepik.com/512/8263/8263152.png"
                  width="50px"
                  height="160px"
                  alt=""
                />
              </div>
              <div className="card-info">
                <h2 className="card-title">{card.title}</h2>
                <p className="card-text">
                  Credits Required: {card.creditsRequired}
                </p>
                <p className="card-text">Uploaded by: {card.userName}</p>
                <p className="card-text">File Name: {card.fileName}</p>
                {card.userName === user?.name ? (
                  <button onClick={() => handleRemove(index)} className="notesBtn">Remove</button>
                ) : card.bought ? (
                  <button onClick={() => handleDownload(index)} className="notesBtn">
                    Download
                  </button>
                ) : (
                  <button onClick={() => handleBuy(index)} className="notesBtn">Buy</button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default ShareNotes;