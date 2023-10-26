import React from 'react'
import { useNavigate } from "react-router-dom";
import { Button, Card, Col, Container, Form, FormCheck, Row } from 'react-bootstrap'
import axios from "axios";

function CreateMatch() {

  const navigate = useNavigate();

  // Autorizace pro přihlášení do systému
  const handleSubmit = (event) => {

  };

  return (
    <div>
      <Container className='mt-4'>
        <Card>
          <Card.Header>
            <h2> Tvorba zápasu </h2>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Control type='text' placeholder='Jmnéno zápasu'></Form.Control>
                <Row>
                  <Col>
                    <Form.Control type='text' placeholder='Jméno prvního hráče'></Form.Control>
                  </Col>
                  <Col>
                    <Form.Control type='text' placeholder='Jméno prvního hráče'></Form.Control>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Select aria-label="Default select example">
                      <option disabled>Vybrat</option>
                      <option value="1">Nejaka frakce</option>
                      <option value="2">Tohle se getne z DB</option>
                    </Form.Select>
                  </Col>
                  <Col>
                  <Form.Select aria-label="Default select example">
                      <option disabled>Vybrat</option>
                      <option value="1">Nejaka detachment</option>
                      <option value="2">Tohle se getne z DB</option>
                    </Form.Select>
                  </Col>
                </Row>
                <Button type='submit'>Připojit</Button>
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  )
}

export default CreateMatch