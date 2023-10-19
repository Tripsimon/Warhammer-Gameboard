import React from 'react'
import { Button, Card, Container, Form, FormCheck } from 'react-bootstrap'

function LoginScreen() {

    function authenticate(e) {
        e.preventDefault()
        console.log("KWK")
    }

  return (
    <div>
        <Container>
        <Card>
            <Card.Header>
                Přihlášení
            </Card.Header>
            <Card.Body>
                <Form>
                    <Form.Group>
                    <Form.Label>Negr</Form.Label>
                    <Form.Control type='text' placeholder='Zadejte token'></Form.Control>
                    <Button onClick={authenticate(this)} type='submit'>Připojit</Button>
                    </Form.Group>
                </Form>
            </Card.Body>
        </Card>
        </Container>
    </div>
  )
}

export default LoginScreen