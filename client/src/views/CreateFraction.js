import React from 'react';
import {Container, Form, Button, Card, Row, Col} from 'react-bootstrap';
import { useNavigate  } from "react-router-dom";

function CreateFraction() {

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
            <h2> Založení frakce </h2>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Control type='text' placeholder='Jméno frakce'></Form.Control>
                <Row>
                  <Col>
                    <Form.Control type='text' placeholder='Popis'></Form.Control>
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
      </Container>
    </div>

)

}

export default CreateFraction