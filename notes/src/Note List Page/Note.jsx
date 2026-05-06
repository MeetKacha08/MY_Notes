import { useEffect, useState } from "react";
import notesData from "../data/notes.js";
import "./Note.css";

function Note() {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes");
    return savedNotes ? JSON.parse(savedNotes) : notesData;
  });

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addOrUpdateNote = () => {
    if (!title.trim()) {
      alert("Title is required");
      return;
    }

    if (editId !== null) {
      const updatedNotes = notes.map((note) =>
        note.id === editId
          ? {
              ...note,
              title,
              content,
              updatedAt: new Date().toLocaleDateString(),
            }
          : note
      );

      setNotes(updatedNotes);
      setEditId(null);
    } else {
      const newNote = {
        id: Date.now(),
        title,
        content,
        createdAt: new Date().toLocaleDateString(),
        updatedAt: new Date().toLocaleDateString(),
      };

      setNotes([newNote, ...notes]);
    }

    setTitle("");
    setContent("");
  };

  const deleteNote = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this note?"
    );

    if (confirmDelete) {
      setNotes(notes.filter((note) => note.id !== id));
      if (selectedNote && selectedNote.id === id) {
        setSelectedNote(null);
      }
    }
  };

  const editNote = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setEditId(note.id);
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app-container">
      <div className="header">
        <div className="header-title">
          <h1>My Notes</h1>
          <span className="note-count">{notes.length} total</span>
        </div>

        <div className="header-buttons">
          <button
            className="btn btn-primary"
            onClick={() => {
              setEditId(null);
              setTitle("");
              setContent("");
              setSelectedNote("form");
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            Add Note
          </button>

          <button
            className="btn btn-danger-outline"
            onClick={() => {
              window.location.reload();
            }}
          >
            Logout
          </button>
        </div>
      </div>

      <div className="search-container">
        <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        <input
          type="text"
          className="search-bar"
          placeholder="Search notes by title or content..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="notes-grid">
        {filteredNotes.length === 0 ? (
          <div className="empty-state">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            <p>No Notes Found</p>
            <small>Try adjusting your search or create a new note.</small>
          </div>
        ) : (
          filteredNotes.map((note, index) => (
            <div
              key={note.id}
              className="note-card"
              onClick={() => setSelectedNote(note)}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <h3>{note.title}</h3>

              <p>
                {note.content.length > 80
                  ? note.content.slice(0, 80) + "..."
                  : note.content}
              </p>

              <div className="note-meta">
                <small>Created: {note.createdAt}</small>
                {note.updatedAt !== note.createdAt && (
                  <small>Updated: {note.updatedAt}</small>
                )}
              </div>

              <div className="card-actions">
                <button
                  className="btn btn-secondary"
                  onClick={(e) => {
                    e.stopPropagation();
                    editNote(note);
                    setSelectedNote("form");
                  }}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteNote(note.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* CREATE / EDIT MODAL */}
      {selectedNote === "form" && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedNote(null)}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2>{editId !== null ? "Edit Note" : "Create New Note"}</h2>
              <button className="close-icon" onClick={() => setSelectedNote(null)}>&times;</button>
            </div>

            <input
              type="text"
              className="modal-input"
              placeholder="Note Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
            />

            <textarea
              className="modal-textarea"
              placeholder="Write your note content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="6"
            />

            <div className="modal-footer">
              <button
                className="btn btn-primary"
                onClick={() => {
                  addOrUpdateNote();
                  setSelectedNote(null);
                }}
              >
                {editId !== null ? "Update Note" : "Save Note"}
              </button>

              <button
                className="btn btn-secondary"
                onClick={() => setSelectedNote(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIEW MODAL */}
      {selectedNote && selectedNote !== "form" && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedNote(null)}
        >
          <div
            className="modal-content view-only"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2>{selectedNote.title}</h2>
              <button className="close-icon" onClick={() => setSelectedNote(null)}>&times;</button>
            </div>

            <div className="view-modal-scroll">
              <p className="view-modal-text">
                {selectedNote.content}
              </p>
            </div>

            <div className="view-modal-meta">
              <span><strong>Created:</strong> {selectedNote.createdAt}</span>
              <span><strong>Last Updated:</strong> {selectedNote.updatedAt}</span>
            </div>

            <div className="modal-footer" style={{ marginTop: '20px' }}>
              <button
                className="btn btn-primary"
                style={{ flex: 1 }}
                onClick={() => {
                   editNote(selectedNote);
                   setSelectedNote("form");
                }}
              >
                Edit Note
              </button>
              <button
                className="btn btn-secondary"
                style={{ flex: 1 }}
                onClick={() => setSelectedNote(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Note;