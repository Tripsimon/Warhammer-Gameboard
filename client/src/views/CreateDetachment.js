//Importy
import React from 'react';
import { Container, Form, Button, Card, Row, Col, Table, Modal } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import requests from '../utils/Requests';

//Komponenta tvorby detachmentů (Asi tady potom nebude -> Jsou to daná data)
function CreateDetachment() {
  const navigate = useNavigate();

  //Variables
  const [factions, setFactions] = useState([]);
  const [detachments, setDetachments] = useState();
  const [selectFactionId, setSelectFactionId] = useState();
  const [createDetachmentName, setCreateDetachmentName] = useState();
  const [createDescription, setCreateDescription] = useState();

  // On-Load
  useEffect(() => {
    getDetachments()
  }, [])

  // On-Load
  useEffect(() => {
    requests.get('/faction/getAllFaction')
      .then(response => {
        setFactions(response.data);
      })
      .catch(error => {
        console.error("Chyba při načítání frakcí", error);
      });
  }, []);

  /**
     * Funkce která založí novou frakci
     * @param {*} event - Data volání
     */
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectFactionId || !createDetachmentName || !createDescription) {
      alert("Vyplňte prosím všechna pole.");
      return;
    }
    try {
      const nameExists = await requests.get('/detachment/checkDetachmentName?detachmentName=' + createDetachmentName);
      if (nameExists.data.exists) {
        alert("Zvolený název již existuje. Zvolte prosím jiný.");
        return;
      }
      await requests.post('/detachment/createDetachment', {
        factionId: selectFactionId,
        detachmentName: createDetachmentName,
        description: createDescription
      })
      await getDetachments();
      alert("Detachment založen.");
      setSelectFactionId("");
      setCreateDetachmentName("");
      setCreateDescription("");
    }
    catch (err) {
      console.log(err);
      alert("Chyba při ověřování názvu.");
    }
  };

  /**
    * Funkce která získá existující detachmenty
    * @param {*} event - Data volání
    */
  const getDetachments = async (event) => {
    await requests.get('/detachment/getAllDetachment')
      .then(res => {
        setDetachments(res.data)
        console.log(factions)
      })
  }

  /**
     * Funkce která smaže vybraný existující detachment
     * @param {number} id -- ID detachmentu ke smazání
     */
  const handleDeleteDetachment = (id) => {
    const confirmDelete = window.confirm("Opravdu chcete smazat tento detachment?");
    if (confirmDelete) {
      requests.delete('/detachment/deleteDetachment?id=' + id)
        .then(() => {
          getDetachments();
        })
        .catch(err => {
          console.log(err);
        })
    }
  }

  /**
   * Funkce která přesměruje uživatele do administrace
   */
  const handleAdminPage = () => {
    navigate("/admin");
  };

  //Stavy
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setSelectFactionId("");
    setCreateDetachmentName("");
    setCreateDescription("");
  }
  const handleShow = () => setShow(true);

  //Komponenta
  return (
    <div>
      <Container className='mt-4'>
        <Card>
          <Card.Header>
            <h2>Správa detachmentů</h2>
            <Button type='submit' onClick={handleShow}>Založení</Button>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Založení nového detachmentu</Modal.Title>
              </Modal.Header>
              <Modal.Body><Form.Group>
                <Form.Label>Vyberte frakci:</Form.Label>
                <Form.Select value={selectFactionId} onChange={(e) => setSelectFactionId(e.target.value)} aria-label="Volba frakce">
                  <option value="" disabled selected>Výběr frakce</option>
                  {factions && factions.map(faction => (
                    <option key={faction.Id} value={faction.Id}>{faction.Name}</option>
                  ))}
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
            {renderTable()}
          </Card.Body>
          <Card.Footer>
            <Button type='submit' onClick={handleAdminPage}>Zpět</Button>
          </Card.Footer>
        </Card>
      </Container>
    </div>
  )


  /**
   * Funkce pro vykreslení tabulky s informacemi o etachmentech
   * @function renderTable
   * @returns {JSX.Element | null} - Vrací JSX element obsahující tabulku s informacemi o detachmentech a názvu frakce
   */
  function renderTable() {
    if (detachments == undefined || factions === undefined) {
      return null;
    } else {
      const tableData = detachments.map(detachment => {
        const faction = factions.find(f => f.Id === detachment.FactionId);
        return {
          Id: detachment.Id,
          FactionName: faction ? faction.Name : 'N/A',
          DetachmentName: detachment.Name,
          Description: detachment.Description,
        };
      });
      return (
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Jméno frakce</th>
              <th>Jméno</th>
              <th>Popis</th>
              <th>Akce</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map(data => (
              <tr key={data.Id}>
                <td>{data.Id}</td>
                <td>{data.FactionName}</td>
                <td>{data.DetachmentName}</td>
                <td>{data.Description}</td>
                <td>
                  <Button variant="secondary" onClick={() => handleDeleteDetachment(data.Id)}>
                    Smazat
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>)
    }
  }
}

//Export
export default CreateDetachment