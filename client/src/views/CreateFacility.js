import React from 'react';
import { Container, Form, Button, Card, Row, Col, Table, Modal } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import FacilitiesEntry from '../components/FacilitiesEntry';
import { useState, useEffect } from 'react';
import axios from 'axios';

function CreateFacility() {

  const [facilities, setFacilities] = useState();

  const [createScreenName, setCreateScreenName] = useState();
  const [createLogin, setCreateLogin] = useState();
  const [createPassword, setCreatePassword] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    getFacilities()
  }, [])

    function renderTable() { 
    if (facilities == undefined) { 
      return 
    } else { 
      return ( <Table striped bordered hover size="sm" > 
    <thead> <tr> <th>ID</th> <th>Jméno herny</th> <th>Login</th> 
    <th>Akce</th> </tr> </thead> <tbody> 
      {facilities.map(facility => ( 
      <tr key={facility.Id}> 
      <td>{facility.Id}</td> 
      <td>{facility.ScreenName}</td> 
      <td>{facility.Login}</td> 
      <td><Button variant="secondary" onClick={() => handleDeleteFacility(facility.Id)}>Smazat</Button></td>
      </tr> ))} 
      </tbody> 
      </Table> ) } }

  /**
   * Funkce ktera ziska existujici facility
   * @param {*} event 
   */
  const getFacilities = async (event) => {
    await axios.get('http://localhost:3001/facility/getAllFacility')
      .then(res => {
        setFacilities(res.data)
        console.log(facilities)
      })
  }

  const handleSubmit = (event) => {
    axios.get('http://localhost:3001/facility/createFacility?screenName=' + createScreenName + '&login=' + createLogin + '&password=' + createPassword)
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


  const handleDeleteFacility = (id) => {
    axios.delete('http://localhost:3001/facility/deleteFacility?id=' + id)
      .then(() => {
        getFacilities();
      })
      .catch(err => {
        console.log(err);
      })
  }

  return (

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
                <Button variant="secondary" onClick={() => getFacilities()} >
                  Reload
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                  Založit
                </Button>
              </Modal.Footer>
            </Modal>
          </Card.Header>
          <Card.Body>
            <Table striped bordered hover size="sm" >
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Jméno herny</th>
                  <th>Login</th>
                  <th>Akce</th>
                </tr>
              </thead>
              <tbody>


              </tbody>

            </Table>
            {renderTable()}
            

          </Card.Body>
          <Col>
            <Button type='submit' onClick={handleAdminPage}>Zpět</Button>
          </Col>
        </Card>
      </Container>
    </div>

  )

}

export default CreateFacility