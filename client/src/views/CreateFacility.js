import React from 'react';
import {Container, Form, Button, Card, Row, Col} from 'react-bootstrap';
import { useNavigate  } from "react-router-dom";

function CreateFacility() {

  const navigate = useNavigate();

    const handleSubmit = (event) => {
  
    };

    const handleAdminPage = () => {
      navigate("/adminPage");
  };

return(

    <div>
      <Container className='mt-4'>
        <Card>
          <Card.Header>
            <h2> Založení herny </h2>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Control type='text' placeholder='Jméno herny'></Form.Control>
                <Row>
                  <Col>
                    <Form.Control type='text' placeholder='Jméno (login)'></Form.Control>
                  </Col>
                  <Col>
                    <Form.Control type='text' placeholder='Heslo'></Form.Control>
                  </Col>
                </Row>
                <Row>
                </Row>
                <Button type='submit'>Založit</Button>
              </Form.Group>
              <Button type='submit'onClick={handleAdminPage}>Zpět</Button>
            </Form>
          </Card.Body>
        </Card>
        <Card>
          <Card.Header>
            <h2> Seznam heren </h2>
          </Card.Header>
          <Card.Body>
            
          </Card.Body>
        </Card>
      </Container>
    </div>

)

}

export default CreateFacility