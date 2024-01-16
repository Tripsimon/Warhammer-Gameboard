//Importy
import React from 'react';
import { Container, Form, Button, Card, Row, Col} from 'react-bootstrap';
import { useNavigate  } from "react-router-dom";

//Stránka administrace
function AdminPage() {
  const navigate = useNavigate();
  
  //Mini router
  const handleFacilities = () => {
    navigate("/createFacility");
  };
  const handleFactions = () => {
    navigate("/createFaction");
  };
  const handleDetachments = () => {
    navigate("/createDetachment");
  };

  //Komponenta
  return (
    <div>
      <Container className='mt-4'>
        <Card>
          <Card.Header>
            <h2> Admin správa </h2>
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

//Export
export default AdminPage