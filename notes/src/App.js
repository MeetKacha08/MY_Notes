// import { useEffect, useState } from "react";
// import notesData from "./data/notes";

// function App() {

//   // Load Notes From Local Storage
//   const [notes, setNotes] = useState(() => {
//     const savedNotes = localStorage.getItem("notes");

//     return savedNotes
//       ? JSON.parse(savedNotes)
//       : notesData;
//   });

//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [search, setSearch] = useState("");

//   const [editId, setEditId] = useState(null);

//   // Popup State
//   const [selectedNote, setSelectedNote] = useState(null);

//   // Save To Local Storage
//   useEffect(() => {
//     localStorage.setItem(
//       "notes",
//       JSON.stringify(notes)
//     );
//   }, [notes]);

//   // Add OR Update Note
//   const addOrUpdateNote = () => {

//     if (!title.trim()) {
//       alert("Title is required");
//       return;
//     }

//     // UPDATE
//     if (editId !== null) {

//       const updatedNotes = notes.map((note) =>
//         note.id === editId
//           ? {
//               ...note,
//               title,
//               content,
//               updatedAt:
//                 new Date().toLocaleDateString(),
//             }
//           : note
//       );

//       setNotes(updatedNotes);

//       setEditId(null);
//     }

//     // ADD
//     else {

//       const newNote = {
//         id: Date.now(),
//         title,
//         content,
//         createdAt:
//           new Date().toLocaleDateString(),
//         updatedAt:
//           new Date().toLocaleDateString(),
//       };

//       setNotes([newNote, ...notes]);
//     }

//     // Clear Fields
//     setTitle("");
//     setContent("");
//   };

//   // Delete Note
//   const deleteNote = (id) => {

//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete?"
//     );

//     if (confirmDelete) {
//       setNotes(
//         notes.filter(
//           (note) => note.id !== id
//         )
//       );
//     }
//   };

//   // Edit Note
//   const editNote = (note) => {

//     setTitle(note.title);
//     setContent(note.content);

//     setEditId(note.id);
//   };

//   // Search Notes
//   const filteredNotes = notes.filter(
//     (note) =>
//       note.title
//         .toLowerCase()
//         .includes(search.toLowerCase()) ||

//       note.content
//         .toLowerCase()
//         .includes(search.toLowerCase())
//   );

//   return (

//     <div
//       style={{
//         padding: "20px",
//         maxWidth: "1200px",
//         margin: "auto",
//         fontFamily: "Arial",
//       }}
//     >

//       {/* HEADER */}
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           marginBottom: "20px",
//         }}
//       >

//         <h1>Notes Management System</h1>

//         <button
//           onClick={() => {

//             setEditId(null);

//             setTitle("");
//             setContent("");

//             setSelectedNote("form");
//           }}
//           style={{
//             padding: "10px 20px",
//             backgroundColor: "#007bff",
//             color: "white",
//             border: "none",
//             borderRadius: "5px",
//             cursor: "pointer",
//           }}
//         >
//           Add Note
//         </button>

//       </div>

//       {/* SEARCH */}
//       <input
//         type="text"
//         placeholder="Search notes..."
//         value={search}
//         onChange={(e) =>
//           setSearch(e.target.value)
//         }
//         style={{
//           width: "100%",
//           padding: "12px",
//           marginBottom: "30px",
//           borderRadius: "5px",
//           border: "1px solid #ccc",
//         }}
//       />

//       {/* NOTES CARDS */}
//       <div
//         style={{
//           display: "flex",
//           gap: "20px",
//           overflowX: "auto",
//           paddingBottom: "10px",
//         }}
//       >

//         {filteredNotes.length === 0 ? (

//           <p>No Notes Found</p>

//         ) : (

//           filteredNotes.map((note) => (

//             <div
//               key={note.id}
//               onClick={() =>
//                 setSelectedNote(note)
//               }
//               style={{
//                 minWidth: "300px",
//                 border: "1px solid #ddd",
//                 borderRadius: "10px",
//                 padding: "15px",
//                 cursor: "pointer",
//                 backgroundColor: "#fff",
//                 boxShadow:
//                   "0 2px 5px rgba(0,0,0,0.1)",
//               }}
//             >

//               <h3>{note.title}</h3>

//               <p>
//                 {note.content.length > 80
//                   ? note.content.slice(
//                       0,
//                       80
//                     ) + "..."
//                   : note.content}
//               </p>

//               <small>
//                 Updated: {note.updatedAt}
//               </small>

//               <br />
//               <br />

//               {/* EDIT BUTTON */}
//               <button
//                 onClick={(e) => {

//                   e.stopPropagation();

//                   editNote(note);

//                   setSelectedNote("form");
//                 }}
//                 style={{
//                   marginRight: "10px",
//                 }}
//               >
//                 Edit
//               </button>

//               {/* DELETE BUTTON */}
//               <button
//                 onClick={(e) => {

//                   e.stopPropagation();

//                   deleteNote(note.id);
//                 }}
//               >
//                 Delete
//               </button>

//             </div>

//           ))

//         )}

//       </div>

//       {/* ADD / EDIT POPUP */}
//       {selectedNote === "form" && (

//         <div
//           onClick={() =>
//             setSelectedNote(null)
//           }
//           style={{
//             position: "fixed",
//             top: 0,
//             left: 0,
//             width: "100%",
//             height: "100%",
//             backgroundColor:
//               "rgba(0,0,0,0.5)",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >

//           <div
//             onClick={(e) =>
//               e.stopPropagation()
//             }
//             style={{
//               backgroundColor: "white",
//               padding: "30px",
//               borderRadius: "10px",
//               width: "500px",
//               maxWidth: "90%",
//             }}
//           >

//             <h2>
//               {editId !== null
//                 ? "Edit Note"
//                 : "Add Note"}
//             </h2>

//             {/* TITLE */}
//             <input
//               type="text"
//               placeholder="Enter title"
//               value={title}
//               onChange={(e) =>
//                 setTitle(e.target.value)
//               }
//               style={{
//                 width: "100%",
//                 padding: "10px",
//                 marginBottom: "15px",
//               }}
//             />

//             {/* CONTENT */}
//             <textarea
//               placeholder="Enter content"
//               value={content}
//               onChange={(e) =>
//                 setContent(e.target.value)
//               }
//               rows="5"
//               style={{
//                 width: "100%",
//                 padding: "10px",
//                 marginBottom: "15px",
//               }}
//             />

//             {/* SAVE BUTTON */}
//             <button
//               onClick={() => {

//                 addOrUpdateNote();

//                 setSelectedNote(null);
//               }}
//               style={{
//                 marginRight: "10px",
//               }}
//             >
//               {editId !== null
//                 ? "Update"
//                 : "Add"}
//             </button>

//             {/* CANCEL BUTTON */}
//             <button
//               onClick={() =>
//                 setSelectedNote(null)
//               }
//             >
//               Cancel
//             </button>

//           </div>

//         </div>

//       )}

//       {/* VIEW NOTE POPUP */}
//       {selectedNote &&
//         selectedNote !== "form" && (

//         <div
//           onClick={() =>
//             setSelectedNote(null)
//           }
//           style={{
//             position: "fixed",
//             top: 0,
//             left: 0,
//             width: "100%",
//             height: "100%",
//             backgroundColor:
//               "rgba(0,0,0,0.5)",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >

//           <div
//             onClick={(e) =>
//               e.stopPropagation()
//             }
//             style={{
//               backgroundColor: "white",
//               padding: "30px",
//               borderRadius: "10px",
//               width: "500px",
//               maxWidth: "90%",
//             }}
//           >

//             <h2>
//               {selectedNote.title}
//             </h2>

//             <hr />

//             <p
//               style={{
//                 marginTop: "20px",
//               }}
//             >
//               {selectedNote.content}
//             </p>

//             <br />

//             <small>
//               Created:
//               {" "}
//               {selectedNote.createdAt}
//             </small>

//             <br />

//             <small>
//               Updated:
//               {" "}
//               {selectedNote.updatedAt}
//             </small>

//             <br />
//             <br />

//             <button
//               onClick={() =>
//                 setSelectedNote(null)
//               }
//             >
//               Close
//             </button>

//           </div>

//         </div>

//       )}

//     </div>
//   );
// }

// export default App;

import { useEffect, useState } from "react";
import notesData from "./data/notes";
import "./App.css"; // IMPORTANT: Importing the new CSS file here!

function App() {
  // Load Notes From Local Storage
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes");
    return savedNotes ? JSON.parse(savedNotes) : notesData;
  });

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);

  // Popup State
  const [selectedNote, setSelectedNote] = useState(null);

  // Save To Local Storage
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  // Add OR Update Note
  const addOrUpdateNote = () => {
    if (!title.trim()) {
      alert("Title is required");
      return;
    }

    // UPDATE
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
    }
    // ADD
    else {
      const newNote = {
        id: Date.now(),
        title,
        content,
        createdAt: new Date().toLocaleDateString(),
        updatedAt: new Date().toLocaleDateString(),
      };
      setNotes([newNote, ...notes]);
    }

    // Clear Fields
    setTitle("");
    setContent("");
  };

  // Delete Note
  const deleteNote = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      setNotes(notes.filter((note) => note.id !== id));
    }
  };

  // Edit Note
  const editNote = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setEditId(note.id);
  };

  // Search Notes
  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app-container">
      {/* HEADER */}
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

      {/* SEARCH */}
      <input
        type="text"
        className="search-bar"
        placeholder="Search notes by title or content..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* NOTES CARDS */}
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
              <small className="note-meta">Updated: {note.updatedAt}</small>

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

      {/* ADD / EDIT POPUP */}
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

      {/* VIEW NOTE POPUP */}
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
            
            <p className="view-modal-text">{selectedNote.content}</p>

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