import { useEffect, useState } from "react";

import { Note as NoteModel } from "./models/note";
import Note from "./components/Note";
import { Button, Col, Container, Row } from "react-bootstrap";
import styles from "./styles/NotePage.module.css";
import stylesutil from "./styles/utils.module.css";
import * as NotesApi from "./api/notes_api";
import AddNoteDialog from "./components/AddNoteDialog";

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);


  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);

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

  return (
    <Container>
      <Button className={`mb-4 ${stylesutil.blockCenter}`} onClick={() => setShowAddNoteDialog(true)}>Add new Note</Button>
      <Row xs={1} md={2} xl={3} className="g-4">
        {notes.map((d) => {
          return (
            <Col key={d._id}>
              <Note key={d._id} note={d} className={styles.note} />
            </Col>
          );
        })}
      </Row>
      {
        showAddNoteDialog && 
        <AddNoteDialog
        onDismiss={() => setShowAddNoteDialog(false)}
        onNoteSaved={(note) => {
          setNotes([...notes, note])
          setShowAddNoteDialog(false);

        }}
        />
      }
    </Container>
  );
}

export default App;
