import React from 'react'
import { useNavigate } from "react-router-dom";
import { Button, Card, Container, Form } from 'react-bootstrap'
import axios from "axios"

function LoginScreen() {

    const navigate = useNavigate();

    // Autorizace pro přihlášení do systému
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.get("http://localhost:3001/auth")
            .then(result => {
                // TODO: Autorizace z DB a asi nějaká ochrana nebo tak


                console.log(result.data)
                navigate("/browseMatches");
            })
            .catch(result => {
                console.log(result.data)
            })
    };

    return (
        <div>
            <Container className='mt-4'>
                <Card>
                    <Form onSubmit={handleSubmit}>
                        <Card.Header>
                            Přihlášení
                        </Card.Header>
                        <Card.Body>

                            <Form.Group>
                                <Form.Control type='text' placeholder='Login' ></Form.Control>
                                <Form.Control type='text' placeholder='Heslo' className='mt-2'></Form.Control>

                            </Form.Group>

                        </Card.Body>
                        <Card.Footer>
                            <Button type='submit'>Připojit</Button>
                        </Card.Footer>
                    </Form>
                </Card>
            </Container>
        </div>
    )
}

export default LoginScreen