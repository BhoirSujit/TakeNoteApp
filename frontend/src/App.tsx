import { useEffect, useState } from "react";

import { Note as NoteModel } from "./models/note";
import Note from "./components/Note";
import { Button, Col, Container, Row } from "react-bootstrap";
import styles from "./styles/NotePage.module.css";
import stylesutil from "./styles/utils.module.css";
import * as NotesApi from "./api/notes_api";
import AddNoteDialog from "./components/AddEditNoteDialog";
import { FaPlus } from "react-icons/fa";
import AddEditNoteDialog from "./components/AddEditNoteDialog";

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);

  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState<NoteModel>(null);

  useEffect(() => {
    async function loadNotes() {
      try {
        const notes = await NotesApi.fetchNote();
        setNotes(notes);
      } catch (error) {
        console.error("Failed to fetch notes:", error);
        alert("Failed to load notes.");
      }
    }

    loadNotes();
  }, []);

  async function deleteNote(note: NoteModel) {
    try {
      await NotesApi.deleteNote(note._id);
      setNotes(notes.filter((existing) => existing._id !== note._id));
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  return (
    <Container>
      <Button
        className={`mb-4 ${stylesutil.blockCenter} ${stylesutil.flexCenter}`}
        onClick={() => setShowAddNoteDialog(true)}
      ><FaPlus/>
        Add new Note
      </Button>
      <Row xs={1} md={2} xl={3} className="g-4">
        {notes.map((d) => {
          return (
            <Col key={d._id}>
              <Note
                key={d._id}
                onNoteClicked={setNoteToEdit}
                note={d}
                onDeleteNoteClicked={deleteNote}
                className={styles.note}
              />
            </Col>
          );
        })}
      </Row>
      {showAddNoteDialog && (
        <AddNoteDialog
          onDismiss={() => setShowAddNoteDialog(false)}
          onNoteSaved={(note) => {
            setNotes([...notes, note]);
            setShowAddNoteDialog(false);
          }}
        />
      )}
      {noteToEdit && <AddEditNoteDialog noteToEdit={noteToEdit}
      onDismiss={() => setNoteToEdit(null)}
      onNoteSaved={(updatedNote) => {
        setNotes(notes.map(d => d._id === updatedNote._id ? updatedNote : d))
        setNoteToEdit(null);
      }}
      />}
    </Container>
  );
}

export default App;
