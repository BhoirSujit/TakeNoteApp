import { Container } from "react-bootstrap";

import SignUpModel from "./components/SignUpModel";
import LoginModel from "./components/LoginModal";
import NavBar from "./components/NavBar";
import { User } from "./models/user";
import { useEffect, useState } from "react";
import * as NotesApi from "./api/notes_api";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotesPage from "./pages/NotesPage";
import PrivacyPage from "./pages/PrivacyPage";
import NotFoundPage from "./pages/NotFoundPage";
import styles from "./styles/App.module.css"
import Footer from "./components/Footer";
import AboutPage from "./pages/AboutPage";


function App() {
  const [loggedInUser, setLoggedInUser] = useState<User | null>();
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
    <BrowserRouter>
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
        <Container className={styles.pageContainer}>
          <Routes>
            <Route
              path="/"
              element={<NotesPage loggedInUser={loggedInUser} />}
            />

            <Route path="/about" element={<AboutPage/>} />
            <Route path="/privacy" element={<PrivacyPage />} />

            <Route path="/*" element={<NotFoundPage />} />
          </Routes>
        </Container>

          <Footer/>

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
    </BrowserRouter>
  );
}

export default App;
