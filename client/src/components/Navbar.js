
import {Navbar, Container, Nav} from 'react-bootstrap'

function NavbarComponent(){
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
      </Navbar.Collapse>
    </Container>
  </Navbar>
)}

export default NavbarComponent;