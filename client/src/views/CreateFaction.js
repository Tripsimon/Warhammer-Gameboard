import React from 'react';
import {Container, Form, Button, Card, Row, Col, Table, Modal} from 'react-bootstrap';
import { useNavigate  } from "react-router-dom";
import FactionsEntry from '../components/FactionsEntry';
import { useState } from 'react';
import axios from 'axios';

function CreateFaction() {

  const navigate = useNavigate();
  
  const [createScreenName, setCreateScreenName] = useState();
  const [createDescription, setCreateDescription] = useState();

  const handleSubmit = (event) => {
    axios.get('http://localhost:3001/faction/createFaction?screenName=' + createScreenName + '&description=' + createDescription)
      .then()
      .catch( err => {
          console.log(err)
      })

  };

  const handleAdminPage = () => {
      navigate("/admin");
  };
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let factions = [{
    "ID":"1",
    "factionName":"Frakce1",
    "description":"Popis1"
  },
  {
    "ID":"2",
    "factionName":"Frakce2",
    "description":"Popis2"
  }];

return(

    <div>
      <Container className='mt-4'>
        <Card>
          <Card.Header>
            <h2> Správa frakcí </h2> <Button type='submit' onClick={handleShow}>Založení</Button>
            <Modal show={show} onHide={handleClose}>
             <Modal.Header closeButton>
              <Modal.Title>Založení nové frakce</Modal.Title>
              </Modal.Header>
              <Modal.Body><Form.Group>
              <Form.Control value={createScreenName} onChange={(e) => setCreateScreenName(e.target.value)} type='text' placeholder='Jméno frakce'></Form.Control>
                <Row>
                  <Col>
                  <Form.Control value={createDescription} onChange={(e) => setCreateDescription(e.target.value)} type='text' placeholder='Popis'></Form.Control>
                  </Col>
                </Row>
              </Form.Group></Modal.Body>
              <Modal.Footer>
               <Button variant="secondary" onClick={handleClose}>
                 Zavřít
               </Button>
                <Button variant="primary" onClick={handleSubmit}>
                  Založit
                </Button>
              </Modal.Footer>
            </Modal>
          </Card.Header>
          <Card.Body>
          <Table striped bordered hover size="sm">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Jméno frakce</th>
                      <th>Popis</th>
                      <th>Akce</th>
                    </tr>
                  </thead>
                  <tbody>
                      {
                        factions.map((match,index) => (
                          <FactionsEntry key={index} ID={match['ID']} factionName={match['factionName']} description={match['description']} />
                        ))}
                      </tbody>
                </Table>            
            </Card.Body>
            <Col>
            <Button type='submit'onClick={handleAdminPage}>Zpět</Button>
            </Col>
            </Card>
      </Container>
    </div>

)

}

export default CreateFaction