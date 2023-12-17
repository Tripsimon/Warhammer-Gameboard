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

/*
  const getData = (event) =>{
    requests.get("/matches/getMatches")
      .then(res =>{
        setAvaliableMatches(res.data)
      })
  }


  useEffect(() => {
    getData()
  }, []);
*/
  const renderMatchesOptions = (event) =>{
    if (avaliableMatches == false) {
      return
    }else{
      return(
        avaliableMatches.map((match,index) => (
          <MatchEntry key={match['Id']} name={match['Name']} state={"TODO"} id={match['Id']} />
        ))
      )
    }
  }

  let matches = [{
    "name":"Jmeno",
    "state":"Stav"
  },
  {
    "name":"Jmeno2",
    "state":"Stav3"
  }];

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
                <Button onClick={()=> navigate("/createMatch")} >Vytvořit zápas</Button>              
            </Card.Body>
        </Card> 
    </Container>
  )
}

export default BrowseMatches