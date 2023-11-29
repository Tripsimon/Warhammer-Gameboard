import React from 'react';
import {Container, Form, Button, Card, Row, Col, Table, Modal} from 'react-bootstrap';
import { useNavigate  } from "react-router-dom";
import { useState, useEffect } from 'react';
import DetachmentsEntry from '../components/DetachmentsEntry';
import axios from 'axios';

function CreateDetachment() {

  const navigate = useNavigate();
  
  const [createFactionId, setCreateFactionId] = useState();
  const [createDetachmentName, setCreateDetachmentName] = useState();
  const [createDescription, setCreateDescription] = useState();

/**
   * Funkce která založí novou frakci
   * @param {*} event 
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!createDetachmentName || !createDescription) { //doplnit !createFactionId
      alert("Vyplňte prosím všechna pole.");
      return;
    }
    axios.get('http://localhost:3001/detachment/createDetachment?factionId=' + createFactionId + '&detachmentName=' + createDetachmentName + '&description=' + createDescription)
      .then(() => {
        //getDetachments(); Doplnit
        alert("Detachment založen.");
        setCreateFactionId("");
        setCreateDetachmentName("");
        setCreateDescription("");
    })
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

  let detachments = [{
    "ID":"1",
    "factionName":"Frakce1",
    "detachmentName":"Název1",
    "description":"Popis1"
  },
  {
    "ID":"2",
    "factionName":"Frakce2",
    "detachmentName":"Název2",
    "description":"Popis2"
  }];

  return(

    <div>
      <Container className='mt-4'>
        <Card>
          <Card.Header>
            <h2>Správa detachmentů </h2> 
            <Button type='submit' onClick={handleShow}>Založení</Button>
            <Modal show={show} onHide={handleClose}>
             <Modal.Header closeButton>
              <Modal.Title>Založení nového detachmentu</Modal.Title>
             </Modal.Header>
             <Modal.Body><Form.Group>
              <Form.Label>Vyberte frakci:</Form.Label>
               <Form.Select value={createFactionId} onChange={(e) => setCreateFactionId(e.target.value)} aria-label="Volba frakce">
                <option selected>Výběr frakce</option>
                <option value="1">Dotažen seznam frakcí z DB</option>
               </Form.Select>
               <Form.Label>Jméno detachmentu:</Form.Label>
               <Form.Control value={createDetachmentName} onChange={(e) => setCreateDetachmentName(e.target.value)} type='text' placeholder='Jméno detachmentu'></Form.Control>
               <Row>
                <Col>
                 <Form.Label>Popis:</Form.Label>
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
                      <th>Jméno detachmentu</th>
                      <th>Popis detachmentu</th>
                      <th>Akce</th>
                    </tr>
                  </thead>
                  <tbody>
                      {
                        detachments.map((match,index) => (
                          <DetachmentsEntry key={index} ID={match['ID']} factionName={match['factionName']} 
                           detachmentName={match['detachmentName']} description={match['description']} />
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

export default CreateDetachment