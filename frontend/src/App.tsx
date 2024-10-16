import { useEffect, useState } from "react";

import { Note as NoteModel } from "./models/note";
import Note from "./components/Note";

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);

  useEffect(() => {
    async function loadNotes() {
      try {
        const response = await fetch("http://localhost:5000/api/notes", {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const notes = await response.json();
        setNotes(notes);
      } catch (error) {
        console.error("Failed to fetch notes:", error);
        alert("Failed to load notes.");
      }
    }

    loadNotes();
  }, []);

  return (
    <>
      <div >
        {notes.map((d) => {
          return <Note key={d._id} note={d} />;
        })}
      </div>
    </>
  );
}

export default App;
