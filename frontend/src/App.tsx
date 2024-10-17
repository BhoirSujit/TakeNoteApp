import { Container } from "react-bootstrap";
import styles from "./styles/NotePage.module.css";
import SignUpModel from "./components/SignUpModel";
import LoginModel from "./components/LoginModal";
import NavBar from "./components/NavBar";
import { User } from "./models/user";
import { useEffect, useState } from "react";
import * as NotesApi from "./api/notes_api";
import NotePageLoggedInView from "./components/NotePageLoggedInView";
import NotePageLoggedOutView from "./components/NotePageLoggedOutView";

function App() {
  const [loggedInUser, setLoggedInUser] = useState<User>();
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    async function fetchLoggedUser() {
      try {
        const user = await NotesApi.getLoggedInUser();
        setLoggedInUser(user);
      } catch (error) {
        console.error(error);
      }
    }
    fetchLoggedUser();
  }, []);

  return (
    <div>
      <NavBar
        loggedInUser={loggedInUser}
        onLoginClicked={() => {
          setShowLoginModal(true);
        }}
        onSignUpClicked={() => {
          setShowSignUpModal(true);
        }}
        onLogoutSuccessful={() => setLoggedInUser(null)}
      />
      <Container className={styles.notesPage}>
        <>
          {loggedInUser ? <NotePageLoggedInView /> : <NotePageLoggedOutView />}
        </>
      </Container>
      {showSignUpModal && (
        <SignUpModel
          onDismiss={() => {
            setShowSignUpModal(false);
          }}
          onSignUpSuccessful={(user) => {
            setLoggedInUser(user);
            setShowSignUpModal(false);
          }}
        />
      )}

      {showLoginModal && (
        <LoginModel
          onDismiss={() => {
            setShowLoginModal(false);
          }}
          onLoginSuccessful={(user) => {
            setLoggedInUser(user);
            setShowLoginModal(false);
          }}
        />
      )}
    </div>
  );
}

export default App;
