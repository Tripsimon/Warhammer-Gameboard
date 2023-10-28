import React from 'react';
import {Container, Form, Button, Card, Row, Col} from 'react-bootstrap';

function AdminPage() {

    const handleSubmit = (event) => {
  
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
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>

)

}

export default AdminPage