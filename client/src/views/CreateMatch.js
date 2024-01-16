//Importy
import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import { useState } from 'react';
import requests from '../utils/Requests';
import { useSelector } from 'react-redux';

//Komponenta pro tvorbu nového zápasu
function CreateMatch() {
  const navigate = useNavigate();

  //Variables
  const [avaliableFactions, setAvaliableFactions] = useState(false);
  const [avaliableDetachments1, setAvaliableDetachments1] = useState(false);
  const [avaliableDetachments2, setAvaliableDetachments2] = useState(false);

  const [matchName, setMatchName] = useState("")

  const [player1Name, setPlayer1Name] = useState("")
  const [player1Faction, SetPlayer1Faction] = useState("")
  const [player1Detachment, setPlayer1Detachment] = useState("")

  const [player2Name, setPlayer2Name] = useState("")
  const [player2Faction, SetPlayer2Faction] = useState("")
  const [player2Detachment, setPlayer2Detachment] = useState("")

  const user = useSelector(state => state.user)


  /**
   * Funkce pro získání potřebných dat z DB
   */
  const getData = () => {
    requests.get("/faction/getAllFaction")
      .then(res => {
        setAvaliableFactions(res.data)
      })
      .catch(err => {
        console.log(err)
        setAvaliableFactions(false)
      })

    requests.get("/detachment/getAllDetachment")
      .then(res => {
        setAvaliableDetachments1(res.data)
        setAvaliableDetachments2(res.data)
      })
      .catch(err => {
        console.log(err)
        setAvaliableDetachments1(false)
        setAvaliableDetachments2(false)
      })
  };

  /**
   * On-Load
   */
  useEffect(() => {
    getData()
  }, []);

  /**
   * Vykreslí možnosti frakcí
   * @returns React Code
   */
  const renderFactionChoices = () => {
    if (avaliableFactions === false) return <option disabled>Při komunikaci se serverem se vyskytla chyba. Prosím, pokuste se o akci později</option>
    return (
      avaliableFactions.map(faction => (
        <option key={faction.Id} value={faction.Id}>{faction.Name}</option>
      ))
    )
  }

  /**
   * Vykreslí možnosti detachmentů prvního hráče
   * @returns React Code
   */
  const renderDetachmentChoices1 = () => {
    if (avaliableDetachments1 === false)
      return
    <option disabled>Při komunikaci se serverem se vyskytla chyba. Prosím, pokuste se o akci později</option>

    if (!player1Faction) {
      return <option value="" defaultValue={undefined}>Vyberte nejprve frakci</option>;
    }

    const filteredDetachments1 = avaliableDetachments1.filter(avaliableDetachments1 => avaliableDetachments1.FactionId === parseInt(player1Faction, 10));

    return (
      filteredDetachments1.length === 0
        ? <option value="" disabled>Tato frakce nemá žádný detachment</option>
        : filteredDetachments1.map(avaliableDetachments1 => (
          <option key={avaliableDetachments1.Id} value={avaliableDetachments1.Id}>{avaliableDetachments1.Name}</option>
        ))
    );
  }

    /**
   * Vykreslí možnosti detachmentů druhého hráče
   * @returns React Code
   */
  const renderDetachmentChoices2 = () => {
    if (avaliableDetachments1 === false)
      return
    <option disabled>Při komunikaci se serverem se vyskytla chyba. Prosím, pokuste se o akci později</option>

    if (!player2Faction) {
      return <option value="" disabled >Vyberte nejprve frakci</option>;
    }

    const filteredDetachments2 = avaliableDetachments2.filter(avaliableDetachments2 => avaliableDetachments2.FactionId === parseInt(player2Faction, 10));

    return (
      filteredDetachments2.length === 0
        ? <option value="" defaultValue={undefined}>Tato frakce nemá žádný detachment</option>
        : filteredDetachments2.map(avaliableDetachments2 => (
          <option key={avaliableDetachments2.Id} value={avaliableDetachments2.Id}>{avaliableDetachments2.Name}</option>
        ))
    );
  }

  /**
   * Vlastní Obsloužení
   * @param {} event - Data volání
   * @returns 
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!matchName || !player1Name || !player1Faction || !player1Detachment || !player2Name || !player2Faction || !player2Detachment) {
      alert("Vyplňte prosím všechna pole.");
      return;
    }
    try {

      const res = await requests.post(
        '/matches/createMatch',
        {
          name: matchName,
          p1: player1Name,
          p1f: player1Faction,
          p1d: player1Detachment,
          p2: player2Name,
          p2f: player2Faction,
          p2d: player2Detachment,
          fId: "" + user.id
        }
      );

      if (res.status === 201) {
        navigate('/browseMatches/');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error('Invalid token');
      } else {
        console.error(error);
      }
      alert('Chyba při vytváření herny.');
    }
  };

  /**
   * Přesun na stranku seznamu her
   */
  const handleBrowse = () => {
    navigate("/browseMatches");
  };

  //Komponenta
  return (
    <div>
      <Container className='mt-4'>
        <Card>
          <Card.Header>
            <h2> Tvorba zápasu </h2>
          </Card.Header>
          <Form onSubmit={handleSubmit}>
            <Card.Body>
              <Form.Group>
                <label>Jméno zápasu:</label>
                <Form.Control type='text' placeholder='Jméno zápasu' value={matchName} onChange={(e) => setMatchName(e.target.value)}></Form.Control>
                <Row className='mt-2'>
                  <Col>
                    <label>1. Hráč</label>
                    <Form.Control type='text' placeholder='Jméno prvního hráče' value={player1Name} onChange={(e) => setPlayer1Name(e.target.value)}></Form.Control>
                  </Col>
                  <Col>
                    <label>2. Hráč</label>
                    <Form.Control type='text' placeholder='Jméno druhého hráče' value={player2Name} onChange={(e) => setPlayer2Name(e.target.value)}></Form.Control>
                  </Col>
                </Row>
                <Row className='mt-2'>
                  <Col>
                    <label>Výběr frakce 1. hráče</label>
                    <Form.Select aria-label="Default select example" value={player1Faction} onChange={(e) => SetPlayer1Faction(e.target.value)}>
                      <option value="" disabled defaultValue={-1}>Výběr frakce</option>
                      {renderFactionChoices()}
                    </Form.Select>
                  </Col>
                  <Col>
                    <label>Výběr frakce 2. hráče</label>
                    <Form.Select aria-label="Default select example" value={player2Faction} onChange={(e) => SetPlayer2Faction(e.target.value)}>
                      <option value="" disabled defaultValue={-1}>Výběr frakce</option>
                      {renderFactionChoices()}
                    </Form.Select>
                  </Col>
                </Row>
                <Row className='mt-2'>
                  <Col>
                    <label>Výběr detachmentu 1. hráče</label>
                    <Form.Select aria-label="Default select example" value={player1Detachment} onChange={(e) => setPlayer1Detachment(e.target.value)}>
                      <option value="" disabled defaultValue={-1}>Výběr detachmentu</option>
                      {renderDetachmentChoices1()}
                    </Form.Select>
                  </Col>
                  <Col>
                    <label>Výběr detachmentu 2. hráče</label>
                    <Form.Select aria-label="Default select example" value={player2Detachment} onChange={(e) => setPlayer2Detachment(e.target.value)}>
                      <option value="" disabled defaultValue={-1}>Výběr detachmentu</option>
                      {renderDetachmentChoices2()}
                    </Form.Select>
                  </Col>
                </Row>
              </Form.Group>
            </Card.Body>
            <Card.Footer className="mt-3">
              <Button variant="secondary" onClick={handleBrowse} className="me-2">Přehled zápasů</Button>
              <Button type='submit'>Založit</Button>
            </Card.Footer>
          </Form>
        </Card>
      </Container>
    </div>
  )
}

//Export
export default CreateMatch