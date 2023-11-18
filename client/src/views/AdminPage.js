import React, {useState, useEffect} from 'react';
import {Container, Form, Button, Card, Row, Col} from 'react-bootstrap';
import { useNavigate  } from "react-router-dom";

function AdminPage() {

    const password = "abc";
    const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
    const [input, setInput] = useState("");
    const checkPassword = () => {
      return input === password;
    }
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

const handleSubmit = () => {
  if (checkPassword()) {
    setIsPasswordCorrect(true);
    sessionStorage.setItem("password", input);
  }
  else
  {
    alert("Chybné heslo!");
  }
}

useEffect(() => {
  var password = sessionStorage.getItem("password");
  if (password) {
    setInput(password);
    setIsPasswordCorrect(true);
  }
}, []);

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

return ( isPasswordCorrect ? 
  renderContent() 
  : 
  <Container className='mt-4'>
        <Card>
          <Card.Header>
            <h2> Admin správa </h2>
          </Card.Header>
          <Card.Body>
            <Form>
              <Form.Group>
                <h4>Zadejte heslo:</h4>
                <Form.Control type="password" placeholder="Heslo" value={input} onChange={(e) => setInput(e.target.value)} />            
                <Button type='submit' onClick={handleSubmit}>Odeslat</Button>
              </Form.Group>
              </Form>
          </Card.Body>
        </Card>
      </Container>
)
}

export default AdminPage