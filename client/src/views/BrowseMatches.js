import React from 'react'
import {Button, Card, Container, Table, } from 'react-bootstrap'
import MatchEntry from '../components/MatchEntry';

function BrowseMatches() {

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
            <Card.Header> Seznam her</Card.Header>
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
                      {
                        matches.map((match,index) => (
                          <MatchEntry key={index} name={match['name']} state={match['state']} />
                        ))}
                      <Button >Vstoupit</Button>

                      </tbody>
                </Table>              
            </Card.Body>
        </Card> 
    </Container>
  )
}

export default BrowseMatches