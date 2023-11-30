import React from 'react'
import { useNavigate } from "react-router-dom";
import { Button, Card, CardGroup, Col, Container, Form, FormCheck, Row } from 'react-bootstrap'
import axios from "axios";

function CreateMatch() {

  const navigate = useNavigate();
  var avaliableFactions = [{id:0, name: "DSA"}]
  var avaliableDetachments1 = [{id:0, name: "DSA"}]
  var avaliableDetachments2 = [{id:0, name: "DSA"}]

  const getData = (event) => {
   axios.get("http://localhost:3001/faction/getAllFaction")
  .then(res =>{
    avaliableFactions = res.data
    console.log(avaliableFactions)
  })
  };

  getData();

  // Vytvoření nového zápasu
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
                <Row className='mt-2'>
                  <Col>
                  <label> 1. Hráč</label>
                    <Form.Control type='text' placeholder='Jméno prvního hráče'></Form.Control>
                  </Col>
                  <Col>
                  <label> 2. Hráč</label>
                    <Form.Control type='text' placeholder='Jméno prvního hráče'></Form.Control>
                  </Col>
                </Row>
                <Row className='mt-2'>
                  <Col>
                    <Form.Select aria-label="Default select example">
                      <option disabled>Vybrat</option>
                      {avaliableFactions.map(faction => ( 
                        <option value={faction.id}> {faction.name}</option>
                      ))}
                    </Form.Select>
                  </Col>
                  <Col>
                  <Form.Select aria-label="Default select example">
                      <option disabled>Vybrat</option>
                      {avaliableFactions.map(faction => ( 
                        <option value={faction.id}> {faction.name}</option>
                      ))}
                    </Form.Select>
                  </Col>
                </Row>

                <Row className='mt-2'>
                  <Col>
                    <Form.Select aria-label="Default select example">
                      <option disabled>Vybrat</option>
                      {avaliableFactions.map(faction => ( 
                        <option value={faction.id}> {faction.name}</option>
                      ))}
                    </Form.Select>
                  </Col>
                  <Col>
                  <Form.Select aria-label="Default select example">
                      <option disabled>Vybrat</option>
                      {avaliableFactions.map(faction => ( 
                        <option value={faction.id}> {faction.name}</option>
                      ))}
                    </Form.Select>
                  </Col>
                </Row>

              </Form.Group>
            </Form>
          </Card.Body>
          <Card.Footer>
                <Button type='submit'>Založit</Button>
          </Card.Footer>
        </Card>
      </Container>
    </div>
  )
}

export default CreateMatch