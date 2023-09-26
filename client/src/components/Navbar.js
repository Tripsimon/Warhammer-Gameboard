
import {Navbar, Container, Nav} from 'react-bootstrap'

function NavbarComponent(){
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
    <Container>
      <Navbar.Brand href="#home">Warhammer Herní board</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="#gameBoard">Hra</Nav.Link>
          <Nav.Link href="#link">KEKW</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
)}

export default NavbarComponent;