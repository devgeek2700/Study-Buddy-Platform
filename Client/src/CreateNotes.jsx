import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./createNotes.css";

function CreateNotes() {
  // State variables
  const { isAuthenticated, user } = useAuth0();
  const [notes, setNotes] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editNoteId, setEditNoteId] = useState(null);
  const [editNoteText, setEditNoteText] = useState("");

  useEffect(() => {
    // Check if user-specific notes exist in local storage
    const userNotes =
      JSON.parse(localStorage.getItem(getUserNotesKey())) || [];
    if (userNotes.length > 0) {
      setNotes(userNotes);
    }
  }, [user]); // Trigger useEffect when user changes

  // Function to get the key for storing user-specific notes
  const getUserNotesKey = () => {
    // Implement your logic to get the user identifier (e.g., user ID or username)
    const userId = user ? user.sub : null; // Get the user's unique identifier
    return userId ? `user_${userId}_notes` : null; // Return null if user is not authenticated
  };

  // Function to create a new note
  const createNote = () => {
    const noteText = document.getElementById("note-text").value.trim();
    if (noteText !== "") {
      const note = {
        id: new Date().getTime(),
        text: noteText,
        createdBy: user.name // Save the name of the user who created the note
      };

      // Get existing user-specific notes from local storage
      const existingNotes =
        JSON.parse(localStorage.getItem(getUserNotesKey())) || [];
      // Add the new note
      existingNotes.push(note);
      // Save the updated notes back to local storage
      localStorage.setItem(getUserNotesKey(), JSON.stringify(existingNotes));

      // Clear input and close popup
      document.getElementById("note-text").value = "";
      setShowPopup(false);
      // Update state to display the newly created note
      setNotes(existingNotes);
    }
  };

  // Function to edit a note
  const editNote = (noteId) => {
    const noteToEdit = notes.find((note) => note.id === noteId);
    setEditNoteId(noteId);
    setEditNoteText(noteToEdit ? noteToEdit.text : "");
    setShowEditDialog(true);
  };

  // Function to update a note
  const updateNote = () => {
    const updatedNotes = notes.map((note) => {
      if (note.id === editNoteId) {
        return { ...note, text: editNoteText };
      }
      return note;
    });

    // Update user-specific notes in local storage
    localStorage.setItem(getUserNotesKey(), JSON.stringify(updatedNotes));

    // Close edit dialog and update state to reflect changes
    setShowEditDialog(false);
    setNotes(updatedNotes);
  };

  // Function to delete a note
  const deleteNote = (noteId) => {
    const filteredNotes = notes.filter((note) => note.id !== noteId);
    // Update user-specific notes in local storage
    localStorage.setItem(getUserNotesKey(), JSON.stringify(filteredNotes));
    // Update state to reflect changes
    setNotes(filteredNotes);
  };

  // Function to download a note
  const downloadNote = (noteId, format) => {
    const noteToDownload = notes.find((note) => note.id === noteId);
    const filename = `note_${noteId}`;

    if (format === "pdf") {
      // PDF download functionality
    } else if (format === "txt") {
      // Text file download functionality
    }
  };

  return (
    <section className="createNotesBox">
      <div id="containercraetenotes">
        <h1>Take Your Notes!!! {user && user.name}</h1>
        <div id="list-header">
          <div id="addNoteDiv" onClick={() => setShowPopup(true)}>
            <i className="fa-solid fa-plus"></i>
          </div>
          <div className="blankDiv"></div>
          <div className="blankDiv"></div>
        </div>

        <div id="list-container">
          <ul id="notes-list">
            {notes.map((note) => (
              <li key={note.id} className="lst_links">
                {user && user.name === note.createdBy ? (
                  <>
                    <span>{note.text}</span>
                    <div id="noteBtns-container">
                      <button id="editBtn" onClick={() => editNote(note.id)}>
                        <i className="fa-solid fa-pen"></i>
                      </button>
                      <button id="deleteBtn" onClick={() => deleteNote(note.id)}>
                        <i className="fa-solid fa-trash"></i>
                      </button>
                      <button
                        id="deleteBtn"
                        onClick={() => downloadNote(note.id, "txt")}
                      >
                        <i className="fa-solid fa-arrow-down"></i>
                      </button>
                    </div>
                  </>
                ) : null}
              </li>
            ))}
          </ul>
        </div>

        {showPopup && (
          <div id="popupContainer">
            <h1>New Note</h1>
            <textarea
              id="note-text"
              placeholder="Enter your note..."
            ></textarea>
            <div id="btn-container">
              <button id="submitBtn" onClick={createNote}>
                Create Note
              </button>
              <button id="closeBtn" onClick={() => setShowPopup(false)}>
                Close
              </button>
            </div>
          </div>
        )}

        {showEditDialog && (
          <div id="editing-container">
            <h1>Edit Note</h1>
            <textarea
              id="note-text"
              value={editNoteText}
              onChange={(e) => setEditNoteText(e.target.value)}
            ></textarea>
            <div id="btn-container">
              <button id="submitBtn" onClick={updateNote}>
                Done
              </button>
              <button id="closeBtn" onClick={() => setShowEditDialog(false)}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default CreateNotes;
