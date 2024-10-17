import { Button } from "react-bootstrap";

interface NavBarLoggedOutViewProps {
  onSignUpClicked: () => void;
  onLoginClicked: () => void;
}

const NavBarLoggedOutView = (props: NavBarLoggedOutViewProps) => {
  return (
    <>
      <Button onClick={props.onSignUpClicked}>Sign Up</Button>
      <Button onClick={props.onLoginClicked}>Log In</Button>
    </>
  );
};

export default NavBarLoggedOutView;
