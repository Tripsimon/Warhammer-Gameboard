import React from 'react'
import { useNavigate } from "react-router-dom";
import { Alert, Button, Card, Container, Form } from 'react-bootstrap'
import { useState } from 'react';
import axios from "axios"
import { useSelector } from 'react-redux';
import { loginUser } from '../stores/userSlice';
import { useLogin } from '../hooks/useLogin';


function LoginScreen() {

    //redux
    const user = useSelector(state => state.user)
    const login = useLogin();


    const [showAlert, setShowAlert] = useState(false);
    const [alertText,setAlertText] = useState("");

    const [Login,setLogin] = useState()
    const [Password,setPassword] = useState()

    const navigate = useNavigate();



    // Autorizace pro přihlášení do systému
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!Login) {
            setAlertText("Prosím, doplňte login vaší herny.")
            setShowAlert(true)
            return
        }

        if (!Password) {
            setAlertText("Prosím, doplňte heslo vaší herny.")
            setShowAlert(true)
            return
        }
        
        
        try {
            const result = await axios.get('http://localhost:3001/loginAutenticate?login=' + Login + '&password=' + Password);
        
                switch (result.data) {
                    case "NOT FOUND":
                        setAlertText("Tento login neexistuje, prosím zkontrolujte zadaná data.")
                        setShowAlert(true)
                        break;

                    case "WRONG PASSWORD":
                        setAlertText("Nesprávné heslo. Prosím, zkontrolujte zadaná data.")
                        setShowAlert(true)
                        break;
                    default:

                        if(result.data){
                            login(result.data)
                        }

                        break;
                }
            } catch (error) {
                console.log(error);
              }
            };

    return (

            
            <Container className='mt-4'>
                <Alert show={showAlert} variant='danger' >
                    <h3>{alertText}</h3>
                </Alert>
                <Card>
                 
                    <Form onSubmit={handleSubmit}>
                        <Card.Header>
                            Přihlášení
                            
                        </Card.Header>
                        <Card.Body>

                            <Form.Group>
                                <Form.Control value={Login} onChange={(e) => setLogin(e.target.value)} type='text' placeholder='Login' ></Form.Control>
                                <Form.Control value={Password} onChange={(e) => setPassword(e.target.value)} type='text' placeholder='Heslo' className='mt-2'></Form.Control>

                            </Form.Group>

                        </Card.Body>
                        <Card.Footer>
                            <Button type='submit'>Připojit</Button>
                        </Card.Footer>
                    </Form>
                </Card>
            </Container>
    )
}

export default LoginScreen