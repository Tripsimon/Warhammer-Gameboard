import {Navbar, Container, Nav, Button} from 'react-bootstrap'
import { useSelector, useDispatch  } from 'react-redux';
import { selectUserName, logoutUser } from '../stores/userSlice';

function NavbarComponent(){
  const userName = useSelector(selectUserName);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutUser());
  };

    return (
        <Navbar expand="lg" className="bg-body-tertiary"
        data-bs-theme='dark'
        >
      <Container>
      <Navbar.Brand href="/">Warhammer Herní board</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/">Gameboard</Nav.Link>
        </Nav>
        <Nav className="me-auto">
          {userName ? (
            <Button variant="secondary" onClick={handleLogout}>
               Odhlášení
            </Button>
            ) : null}
         </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
)}

export default NavbarComponent;