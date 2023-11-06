import React from 'react'
import { useNavigate } from "react-router-dom";
import { Button, Card, Container, Form, FormCheck } from 'react-bootstrap'
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

    const handleAdminLogin = () => {
        navigate("/adminPage");
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