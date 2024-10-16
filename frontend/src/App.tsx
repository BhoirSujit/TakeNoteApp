import { useEffect, useState } from "react";
import "./App.css";
import { Note } from "./models/note";

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  
  useEffect(() => {
    async function loadNotes() {
      try {
        const response = await fetch("http://localhost:5000/api/notes", { method: "GET" });

        // Check if the response is OK (status in the range 200-299)
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        console.log(response);
        const notes = await response.json();
        setNotes(notes);
      } catch (error) {
        console.error("Failed to fetch notes:", error);
        alert("Failed to load notes. Please try again later.");
      }
    }

    loadNotes();
  }, []);

  return (
    <>
      <div className="App">
        {JSON.stringify(notes)}
      </div>
    </>
  );
}

export default App;

