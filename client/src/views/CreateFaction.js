import React from 'react';
import {Container, Form, Button, Card, Row, Col, Table, Modal} from 'react-bootstrap';
import { useNavigate  } from "react-router-dom";
import FactionsEntry from '../components/FactionsEntry';
import { useState, useEffect } from 'react';
import axios from 'axios';

function CreateFaction() {

  const navigate = useNavigate();
  
  const [factions, setFactions] = useState();
  const [createScreenName, setCreateScreenName] = useState();
  const [createDescription, setCreateDescription] = useState();
  const [createCodeName, setCreateCodeName] = useState();


  useEffect(() => {
    getFactions()
  }, [])

    /**
   * Funkce která založí novou frakci
   * @param {*} event 
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!createScreenName || !createDescription) {
      alert("Vyplňte prosím všechna pole.");
      return;
    }
    axios.get('http://localhost:3001/faction/createFaction?screenName=' + createScreenName + '&codeName=' + createCodeName + '&description=' + createDescription)
      .then(() => {
        getFactions();
        alert("Frakce založena.");
        setCreateScreenName("");
        setCreateCodeName("");
        setCreateDescription("");
    })
      .catch( err => {
          console.log(err)
      })
  };

 /**
   * Funkce která ziská existující frakce
   * @param {*} event 
   */
 const getFactions = async (event) => {
  await axios.get('http://localhost:3001/faction/getAllFaction')
    .then(res => {
      setFactions(res.data)
      console.log(factions)
    })
}

 /**
   * Funkce která smaže vybranou existující frakci
   * @param {number} id -- ID herny ke smazání
   */
 const handleDeleteFaction = (id) => {
  const confirmDelete = window.confirm("Opravdu chcete smazat tuto frakci?");
  if (confirmDelete) {
    axios.delete('http://localhost:3001/faction/deleteFaction?id=' + id)
    .then(() => {
      getFactions();
    })
    .catch(err => {
      console.log(err);
    })
}
}

  const handleAdminPage = () => {
      navigate("/admin");
  };
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

 return(
    <div>
      <Container className='mt-4'>
        <Card>
          <Card.Header>
            <h2>Správa frakcí</h2> 
            <Button type='submit' onClick={handleShow}>Založení</Button>
            <Modal show={show} onHide={handleClose}>
             <Modal.Header closeButton>
              <Modal.Title>Založení nové frakce</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.Group>
                  <Form.Label>Jméno frakce:</Form.Label>
                  <Form.Control value={createScreenName} onChange={(e) => setCreateScreenName(e.target.value)} type='text' placeholder='Jméno frakce'></Form.Control>
                  <Row>
                      <Col>
                        <Form.Label>codeName:</Form.Label>
                        <Form.Control value={createCodeName} onChange={(e) => setCreateCodeName(e.target.value)} type='text' placeholder='codeName'></Form.Control>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Label>Popis frakce:</Form.Label>
                        <Form.Control value={createDescription} onChange={(e) => setCreateDescription(e.target.value)} type='text' placeholder='Popis'></Form.Control>
                      </Col>
                    </Row>
                </Form.Group>
               </Modal.Body>
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
          {renderTable()}        
            </Card.Body>
              <Col>
                <Button type='submit'onClick={handleAdminPage}>Zpět</Button>
              </Col>
            </Card>
      </Container>
    </div>
)

/**
 * Funkce pro vykreslení tabulky s informacemi o frakcích
 * @function renderTable
 * @returns {JSX.Element | null} - Vrací JSX element obsahující tabulku s informacemi o hernách nebo null, pokud nejsou žádné herny k dispozici.
 */
function renderTable() { 
  if (factions == undefined) { 
    return 
  } else { 
    return ( <Table striped bordered hover size="sm" > 
      <thead> 
        <tr> 
          <th>ID</th> 
          <th>Jméno frakce</th> 
          <th>codeName ???</th> 
          <th>Ppopis</th> 
        </tr> 
      </thead> 
      <tbody> 
        {factions.map(factions => ( 
          <tr key={factions.Id}> 
          <td>{factions.Id}</td> 
          <td>{factions.Name}</td> 
          <td>{factions.CodeName}</td> 
          <td>{factions.Description}</td> 
          <td><Button variant="secondary" onClick={() => handleDeleteFaction(factions.Id)}>Smazat</Button></td>
        </tr> ))} 
      </tbody> 
    </Table> ) } }
}

export default CreateFaction