import React, {useState, useEffect} from 'react';
import {Container, Form, Button, Card, Row, Col} from 'react-bootstrap';
import { useNavigate  } from "react-router-dom";


function AdminPage() {

    const password = "abc";
    const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
    const [savedPassword, setSavedPassword] = useState("");
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
    setSavedPassword(input);
    sessionStorage.setItem("password", input);
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
  if (isPasswordCorrect) {
    return (

    <div>
      <Container className='mt-4'>
        <Card>
          <Card.Header>
            <h2> Admin správa </h2>
                <Button type='submit' onClick={() => {
                  setSavedPassword("");
                  sessionStorage.removeItem("password");
                  window.location.reload();
                  }}>Odhlásit</Button>
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
} else {
  return null
}
}

return (
    (
    <div>
      <label>Zadejte heslo:</label>
      <input type="password" value={input} onChange={(e) => setInput(e.target.value)} />
  <button type='submit' onClick={handleSubmit}>Odeslat</button>
  {renderContent()}
    </div>
  )
)

}

export default AdminPage