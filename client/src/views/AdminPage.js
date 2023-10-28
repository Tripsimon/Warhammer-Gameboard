import React from 'react';
import {Container, Form, Button, Card, Row, Col} from 'react-bootstrap';
import { useNavigate  } from "react-router-dom";


function AdminPage() {

    const navigate = useNavigate();

    const handleFacilities = () => {
        navigate("/createFacility");
};

    const handleFractions = () => {
    navigate("/createFraction");
};

    const handleDetachments = () => {
    navigate("/createDetachment");
};
return(

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
                <Button type='submit' onClick={handleFractions}>Spravovat</Button>
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
export default AdminPage