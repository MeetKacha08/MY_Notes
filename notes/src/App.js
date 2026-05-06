import { useEffect, useState } from "react";
import notesData from "./data/notes";
import "./App.css";

function App() {
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
      "Are you sure you want to delete?"
    );

    if (confirmDelete) {
      setNotes(notes.filter((note) => note.id !== id));
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
        <h1>Notes</h1>

        <button
          className="btn btn-primary"
          onClick={() => {
            setEditId(null);
            setTitle("");
            setContent("");
            setSelectedNote("form");
          }}
        >
          + Add Note
        </button>
      </div>

      <input
        type="text"
        className="search-bar"
        placeholder="Search notes by title or content..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="notes-grid">
        {filteredNotes.length === 0 ? (
          <div className="empty-state">No Notes Found</div>
        ) : (
          filteredNotes.map((note) => (
            <div
              key={note.id}
              className="note-card"
              onClick={() => setSelectedNote(note)}
            >
              <h3>{note.title}</h3>

              <p>
                {note.content.length > 80
                  ? note.content.slice(0, 80) + "..."
                  : note.content}
              </p>

              <div className="note-meta">
                <small>Created: {note.createdAt}</small>
                <small>Updated: {note.updatedAt}</small>
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

      {selectedNote === "form" && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedNote(null)}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>{editId !== null ? "Edit Note" : "Create New Note"}</h2>

            <input
              type="text"
              className="modal-input"
              placeholder="Note Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
              className="modal-textarea"
              placeholder="Write your note content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="5"
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

      {selectedNote && selectedNote !== "form" && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedNote(null)}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>{selectedNote.title}</h2>

            <p className="view-modal-text">
              {selectedNote.content}
            </p>

            <div className="view-modal-meta">
              <span>Created: {selectedNote.createdAt}</span>
              <span>Last Updated: {selectedNote.updatedAt}</span>
            </div>

            <button
              className="btn btn-secondary"
              style={{ width: "100%" }}
              onClick={() => setSelectedNote(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;