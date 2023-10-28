import React from 'react';
import {Container, Form, Button, Card, Row, Col} from 'react-bootstrap';
import { useNavigate  } from "react-router-dom";

function CreateDetachment() {

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
            <h2> Založení detachmentu </h2>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
            <Form.Group>
            <Form.Select aria-label="Default select example">
                      <option disabled>Výběr frakce</option>
                      <option value="1">Dotažen seznam frakcí z DB</option>
                    </Form.Select>
                <Form.Control type='text' placeholder='Jméno detachmentu'></Form.Control>
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

export default CreateDetachment