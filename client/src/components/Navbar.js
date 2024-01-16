//Importy
import { Navbar, Container, Nav, Button } from 'react-bootstrap'
import { useSelector, useDispatch  } from 'react-redux';
import { selectUserName, logoutUser } from '../stores/userSlice';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';

//Koomponenta navigační lišty
function NavbarComponent(){
  const userName = useSelector(selectUserName);
  const cookies = new Cookies(null, {path: '/'});
  const usernameCookie = cookies.get("username")
  const isLoggedIn = userName || usernameCookie
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Funkce pro odhlášení uživatele. Jsou tu trochu brikule kvuli osahání cookies kolegou. V nasazení pak dispatch bdue stačit
  const handleLogout = () => {
    dispatch(logoutUser());
    cookies.remove("username");
    cookies.remove("userID");
    cookies.remove("isAdmin");
    cookies.remove("token");
    navigate('/');
  };

  //Vlastní komponenta
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
          {isLoggedIn ? (
            <Button variant="secondary" onClick={handleLogout}>
               Odhlášení
            </Button>
            ) : null}
         </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
)}

//Export
export default NavbarComponent;