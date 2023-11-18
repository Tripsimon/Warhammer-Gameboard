import React from 'react';
import {Container, Form, Button, Card, Row, Col, Table, Modal} from 'react-bootstrap';
import { useNavigate  } from "react-router-dom";
import { useState } from 'react';
import DetachmentsEntry from '../components/DetachmentsEntry';

function CreateDetachment() {

  const navigate = useNavigate();
  
  const handleSubmit = (event) => {
  };

  const handleAdminPage = () => {
      navigate("/adminPage");
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let detachments = [{
    "ID":"1",
    "fractionName":"Frakce1",
    "detachmentName":"Název1",
    "description":"Popis1"
  },
  {
    "ID":"2",
    "fractionName":"Frakce2",
    "detachmentName":"Název2",
    "description":"Popis2"
  }];

  return(

    <div>
      <Container className='mt-4'>
        <Card>
          <Card.Header>
            <h2> Správa detachmentů </h2> <Button type='submit' onClick={handleShow}>Založení</Button>
            <Modal show={show} onHide={handleClose}>
             <Modal.Header closeButton>
              <Modal.Title>Založení nového detachmentu</Modal.Title>
              </Modal.Header>
              <Modal.Body><Form.Group>
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
                          <DetachmentsEntry key={index} ID={match['ID']} fractionName={match['fractionName']} 
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