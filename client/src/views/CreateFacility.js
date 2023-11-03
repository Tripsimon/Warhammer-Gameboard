import React from 'react';
import {Container, Form, Button, Card, Row, Col, Table, Modal} from 'react-bootstrap';
import { useNavigate  } from "react-router-dom";
import FacilitiesEntry from '../components/FacilitiesEntry';
import { useState } from 'react';

function CreateFacility() {

  const [createScreenName,setCreateScreenName] =useState();
  const [createLogin,setCreateLogin] =useState();
  const [createPassword,setCreatePassword] =useState();

  const navigate = useNavigate();

  const handleSubmit = (event) => {
  
};

  const handleAdminPage = () => {
      navigate("/adminPage");
    };
      const [show, setShow] = useState(false);
      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);


  let facilities = [{
    "ID":"1",
    "facilityName":"Herna1",
    "login":"login"
  },
  {
    "ID":"2",
    "facilityName":"Herna2",
    "login":"login2"
  }];
return(

    <div>
      <Container className='mt-4'>
         


        <Card>
          <Card.Header>
            <h2> Správa heren </h2> <Button type='submit' onClick={handleShow}>Založení</Button>
            <Modal show={show} onHide={handleClose}>
             <Modal.Header closeButton>
              <Modal.Title>Založení nové herny</Modal.Title>
              </Modal.Header>
              <Modal.Body><Form.Group>
                <Form.Control value={createScreenName} onChange={(e) => setCreateScreenName(e.target.value)} type='text' placeholder='Jméno herny'></Form.Control>
                <Row>
                  <Col>
                    <Form.Control value={createLogin} onChange={(e) => setCreateLogin(e.target.value)} type='text' placeholder='Jméno (login)'></Form.Control>
                  </Col>
                  <Col>
                    <Form.Control value={createPassword} onChange={(e) => setCreatePassword(e.target.value)} type='text' placeholder='Heslo'></Form.Control>
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
                      <th>Jméno herny</th>
                      <th>Login</th>
                      <th>Akce</th>
                    </tr>
                  </thead>
                  <tbody>
                      {
                        facilities.map((match,index) => (
                          <FacilitiesEntry key={index} ID={match['ID']} facilityName={match['facilityName']} login={match['login']} />
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

export default CreateFacility