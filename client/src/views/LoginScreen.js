import React from 'react'
import { Button, Card, Container, Form, FormCheck } from 'react-bootstrap'
import axios from "axios"

function LoginScreen() {

    const handleSubmit = (event) =>{
        event.preventDefault();
       axios.get("http://localhost:3001/auth")
        .then(result => {
            console.log(result.data)
        })
        .catch(result =>{
            console.log(result.data)
        })
    };

  return (
    <div>
        <Container className='mt-4'>
        <Card>
            <Card.Header>
                Přihlášení
            </Card.Header>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                    <Form.Control type='text' placeholder='Zadejte token'></Form.Control>
                    <Button type='submit'>Připojit</Button>
                    </Form.Group>
                </Form>
            </Card.Body>
        </Card>
        </Container>
    </div>
  )
}

export default LoginScreen