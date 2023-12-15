import React, {useState, useEffect} from 'react';
import { Alert, Container, Form, Button, Card, Row, Col} from 'react-bootstrap';
import { useNavigate  } from "react-router-dom";
import axios from "axios"
import { useSelector } from 'react-redux';
import { loginUser } from '../stores/userSlice';
import { useLogin } from '../hooks/useLogin';
import { selectIsAdminLoggedIn } from '../stores/userSlice';

function AdminPage() {

  const [Password,setPassword] = useState()
  const user = useSelector(state => state.user)
  const login = useLogin();
  const [showAlert, setShowAlert] = useState(false);
  const [alertText,setAlertText] = useState("");
  const isAdminLoggedIn = useSelector(selectIsAdminLoggedIn);

    // Autorizace pro přihlášení do systému
    const handleSubmit = async (event) => {
      event.preventDefault();

      if (!Password) {
          setAlertText("Prosím, doplňte heslo.")
          setShowAlert(true)
          return
      }
      
      try {
          const result = await axios.post('http://localhost:3001/loginAutenticate', {
              login: "admin",
              password: Password
          })
   
          if (result.data.notFound) {
            setAlertText("Tento login neexistuje, prosím zkontrolujte databázi.");
            setShowAlert(true);
        } else if (result.data.wrongPassword) {
            setAlertText("Nesprávné heslo. Prosím, zkontrolujte zadaná data.");
            setShowAlert(true);
        } else {
            if (result.data) {
                login(result.data);
            }
        }
          } catch (error) {
              console.log(error);
            }
          };

    const navigate = useNavigate();
    const handleFacilities = () => {
    navigate("/createFacility");
};
    const handleFactions = () => {
    navigate("/createFaction");
};
    const handleDetachments = () => {
    navigate("/createDetachment");
};

const renderContent = () => {
 
    return (
  
    <div>
      <Container className='mt-4'>
        <Card>
          <Card.Header>
            <h2> Admin správa </h2>
                <Button type='submit' onClick={() => {
                 
                  sessionStorage.removeItem("password");
                  window.location.reload();
                  }}>Odhlásit se</Button>
          </Card.Header>
          <Card.Body>
            <Form>
              <Form.Group>
                <h4>Správa heren</h4>
                <Button type='submit' onClick={handleFacilities}>Spravovat</Button>
                <Row>
                </Row>
              </Form.Group>
              <Form.Group>
                <h4>Správa frakcí</h4>
                <Button type='submit' onClick={handleFactions}>Spravovat</Button>
                <Row>
                </Row>
              </Form.Group>
              <Form.Group>
                <h4>Správa detachmentů</h4>
                <Button type='submit' onClick={handleDetachments}>Spravovat</Button>
                <Row>
                </Row>
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
)
}

return ( isAdminLoggedIn ? 
  renderContent() 
  : 
  <Container className='mt-4'>
     <Alert show={showAlert} variant='danger' >
        <h3>{alertText}</h3>
      </Alert>
        <Card>
          <Card.Header>
            <h2> Admin správa </h2>
          </Card.Header>
          <Card.Body>
            <Form>
              <Form.Group>
                <h4>Zadejte heslo:</h4>
                <Form.Control type='password' placeholder='Heslo' value={Password} onChange={(e) => setPassword(e.target.value)} className='mt-2'></Form.Control>          
                <Button type='submit' onClick={handleSubmit}>Odeslat</Button>
              </Form.Group>
              </Form>
          </Card.Body>
        </Card>
      </Container>
)
}

export default AdminPage