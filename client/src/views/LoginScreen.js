import React from 'react'
import { useNavigate } from "react-router-dom";
import { Alert, Button, Card, Container, Form } from 'react-bootstrap'
import { useState } from 'react';
import axios from "axios"
import { useSelector } from 'react-redux';



function LoginScreen() {

    const count = useSelector(state => state.counter.value)
    console.log(count)

    const [showAlert, setShowAlert] = useState(false);
    const [alertText,setAlertText] = useState("");

    const [Login,setLogin] = useState()
    const [Password,setPassword] = useState()

    const navigate = useNavigate();



    // Autorizace pro přihlášení do systému
    const handleSubmit = (event) => {
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
        
        
        axios.get("http://localhost:3001/loginAutenticate?login="+Login+"&password="+Password)
            .then(result => {
                console.log()
                switch (result.data) {
                    case "NOT FOUND":
                        setAlertText("Tato kombinace loginu a hesla nebyla nalezena. Prosím, zkontrolujte zadaná data")
                        setShowAlert(true)
                        break;

                    case "WRONG PASSWORD":
                        setAlertText("Nesprávné heslo. Prosím, zkontrolujte zadaná data")
                        setShowAlert(true)
                        break;
                    default:

                        //SUCCESS
                        if(result.data){
                            navigate("/browseMatches");
                            console.log(result.data)
                        }

                        break;
                }

            })
            .catch(result => {
                console.log(result.data)
            })
            

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