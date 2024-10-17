import React from "react";
import { User } from "../models/user";
import { Container, Nav, Navbar } from "react-bootstrap";
import NavBarLoggedInView from "./NavBarLoggedInView";
import NavBarLoggedOutView from "./NavBarLoggedOutView";
import { Link } from "react-router-dom";

interface NavBarProps {
  loggedInUser?: User | null;
  onSignUpClicked: () => void;
  onLoginClicked: () => void;
  onLogoutSuccessful: () => void;
}

const NavBar = (props: NavBarProps) => {
  return (
    <Navbar bg="primary" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand to="/" as={Link}>Take Notes App</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar"></Navbar.Toggle>
        <Navbar.Collapse id="main-navbar">

<Nav>
    <Nav.Link to="/privacy" as={Link}>
        Privacy
    </Nav.Link>
   
</Nav>


          <Nav className="ms-auto">
            {props.loggedInUser ? (
              <NavBarLoggedInView
                user={props.loggedInUser}
                onLogoutSuccessful={props.onLogoutSuccessful}
              />
            ) : (
              <NavBarLoggedOutView
                onLoginClicked={props.onLoginClicked}
                onSignUpClicked={props.onSignUpClicked}
              />
            )}{" "}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
