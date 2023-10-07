import React from 'react'
import {Button, Card, Container, ListGroup, ListGroupItem, } from 'react-bootstrap'

function BrowseMatches() {

  let KEKW = {
    "name":"Jmeno"
  }

  return (
    <Container className='mt-2'>
        <Card data-bs-theme="dark">
            <Card.Header> Seznam her</Card.Header>
            <Card.Body>
                <ListGroup>
                    <ListGroupItem> 
                      {KEKW.name} 
                      <Button >Vstoupit</Button>
                      </ListGroupItem>
                </ListGroup>
            </Card.Body>
        </Card> 
    </Container>
  )
}

export default BrowseMatches