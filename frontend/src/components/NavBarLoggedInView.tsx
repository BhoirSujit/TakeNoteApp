
import { User } from '../models/user'
import * as NotesApi from "../api/notes_api"
import { Button, Navbar } from 'react-bootstrap';

interface NavBarLoggedInViewProps {
    user: User,
    onLogoutSuccessful: () => void,
}

const NavBarLoggedInView = (props: NavBarLoggedInViewProps) => {
  
  async function logout() {
    try {
        await NotesApi.logout();
        props.onLogoutSuccessful();
    } catch (error) {
        console.log(error)
        alert(error);
    }
  }
  
  
    return (
    <>
    <Navbar.Text className='me-2'>
        Singned is as : {props.user.username} 
    </Navbar.Text>
    <Button onClick={logout}>Log out</Button>

    </>
  )
}

export default NavBarLoggedInView
