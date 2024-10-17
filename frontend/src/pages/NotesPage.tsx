
import styles from "../styles/NotePage.module.css";
import { Container } from 'react-bootstrap'
import { User } from "../models/user";
import NotePageLoggedInView from "../components/NotePageLoggedInView";
import NotePageLoggedOutView from "../components/NotePageLoggedOutView";

interface NotesPageProps  {
    loggedInUser: User | null | undefined
}

const NotesPage = ({loggedInUser} : NotesPageProps) => {
  return (
    <Container className={styles.notesPage}>
    <>
      {loggedInUser ? <NotePageLoggedInView /> : <NotePageLoggedOutView />}
    </>
  </Container>
  )
}

export default NotesPage
