import React from 'react';
import { Container, Form, Button, Card, Row, Col, Table, Modal } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import FacilitiesEntry from '../components/FacilitiesEntry';
import { useState, useEffect } from 'react';
import axios from 'axios';
import bcrypt from 'bcryptjs';

function CreateFacility() {

  const [facilities, setFacilities] = useState();
  const [createScreenName, setCreateScreenName] = useState();
  const [createLogin, setCreateLogin] = useState();
  const [createPassword, setCreatePassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const saltRounds = 10; //10 rund saltingu hesla

  const navigate = useNavigate();

  useEffect(() => {
    getFacilities()
  }, [])

  /**
 * Funkce pro vykreslení tabulky s informacemi o hernách.
 * @function renderTable
 * @returns {JSX.Element | null} - Vrací JSX element obsahující tabulku s informacemi o hernách nebo null, pokud nejsou žádné herny k dispozici.
 */
    function renderTable() { 
    if (facilities == undefined) { 
      return 
    } else { 
      return ( <Table striped bordered hover size="sm" > 
        <thead> 
          <tr> 
            <th>ID</th> 
            <th>Jméno herny</th> 
            <th>Login</th> 
            <th>Akce</th> 
          </tr> 
        </thead> 
        <tbody> 
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
   * Funkce která ziská existující herny
   * @param {*} event 
   */
  const getFacilities = async (event) => {
    await axios.get('http://localhost:3001/facility/getAllFacility')
      .then(res => {
        setFacilities(res.data)
        console.log(facilities)
      })
  }

  /**
   * Funkce která založí novou hernu
   * @param {*} event 
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!createScreenName || !createLogin || !createPassword || !confirmPassword) {
      alert("Vyplňte prosím všechna pole.");
      return;
    }
    if (createPassword !== confirmPassword) {
      alert("Hesla se neshodují. Zkontrolujte prosím zadání.");
      return;
    }
    try {
      const loginExists = await axios.get('http://localhost:3001/facility/checkFacilityLogin?login=' + createLogin);
      if (loginExists.data.exists) {
        alert("Přihlašovací jméno (login) již existuje. Zvolte prosím jiné.");
        return;
      }
      const hashedPassword = await bcrypt.hash(createPassword, saltRounds);

      await axios.get('http://localhost:3001/facility/createFacility?screenName=' + createScreenName + '&login=' + createLogin + '&password=' + hashedPassword);
      getFacilities();
      alert("Herna založena.");
      setCreateScreenName("");
      setCreateLogin("");
      setCreatePassword("");
      setConfirmPassword("");
    } catch (err) {
      console.log(err);
      alert("Chyba při ověřování loginu.");
    }
  };

  const handleAdminPage = () => {
    navigate("/admin");
  };
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

 /**
   * Funkce která smaže vybranou existující hernu
   * @param {number} id -- ID herny ke smazání
   */
  const handleDeleteFacility = (id) => {
    const confirmDelete = window.confirm("Opravdu chcete smazat tuto hernu?");
    if (confirmDelete) {
      axios.delete('http://localhost:3001/facility/deleteFacility?id=' + id)
      .then(() => {
        getFacilities();
      })
      .catch(err => {
        console.log(err);
      })
  }
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
              <Modal.Body>
                <Form.Group>
                  <Row>
                    <Col>
                      <Form.Label>Jméno herny:</Form.Label>
                      <Form.Control value={createScreenName} onChange={(e) => setCreateScreenName(e.target.value)} type='text' placeholder='Jméno herny'></Form.Control>
                    </Col>
                    <Col>
                      <Form.Label>Přihlašovací jméno (login):</Form.Label>
                      <Form.Control value={createLogin} onChange={(e) => setCreateLogin(e.target.value)} type='text' placeholder='Login'></Form.Control>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Label>Heslo:</Form.Label>
                      <Form.Control value={createPassword} onChange={(e) => setCreatePassword(e.target.value)} type='password' placeholder='Heslo'></Form.Control>
                    </Col>
                    <Col>
                      <Form.Label>Heslo znovu:</Form.Label>
                      <Form.Control value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type='password' placeholder='Heslo znovu'></Form.Control>
                    </Col>
                  </Row>
                </Form.Group>
              </Modal.Body>
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
            {renderTable()}       
          </Card.Body>
          <Card.Footer>
            <Button type='submit' onClick={handleAdminPage}>Zpět</Button>
          </Card.Footer>
        </Card>
      </Container>
    </div>
  )
}

export default CreateFacility