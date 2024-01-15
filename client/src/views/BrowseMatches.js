import React from 'react';
import { Button, Card, Container, Table } from 'react-bootstrap';
import { useNavigate  } from "react-router-dom";
import MatchEntry from '../components/MatchEntry';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import requests from '../utils/Requests';


function BrowseMatches() {

  const [avaliableMatches, setAvaliableMatches] = useState(false);
  const navigate = useNavigate();
  const user = useSelector(state => state.user)


  //Získá si data jednotlivých zápasů
  const getData = (event) =>{

    requests.get("/matches/getMatches?id=" + user.id)
      .then(res =>{
        setAvaliableMatches(res.data)
      })
  }


  useEffect(() => {
    getData()
  }, []);

  const renderMatchesOptions = (event) =>{
    if (avaliableMatches == false) {
      return
    }else{
      return(
        avaliableMatches.map((match,index) => (
          <MatchEntry key={match['Id']} name={match['Name']} state={match["Round"] == 5 ?   "DOKONčENO": match["Round"] } id={match['Id']} />
        ))
      )
    }
  }


  return (
    <Container className='mt-2'>
        <Card data-bs-theme="dark">
            <Card.Header> {user.name} - {user.id} - Seznam her</Card.Header>
            <Card.Body>
                <Table striped bordered hover size="sm">
                  <thead>
                    <tr>
                      <th>Jmeno</th>
                      <th>Stav</th>
                      <th>Ovládání</th>
                    </tr>
                  </thead>
                  <tbody>
                      {renderMatchesOptions()}
                      </tbody>
                </Table>
            </Card.Body>
            <Card.Footer>
              <Button onClick={()=> navigate("/createMatch")} >Vytvořit zápas</Button>        
            </Card.Footer>
        </Card> 
    </Container>
  )
}

export default BrowseMatches