import React from 'react'
import { useFetcher, useNavigate } from "react-router-dom";
import { Alert, Button, Card, Container, Form } from 'react-bootstrap'
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, selectUserName, selectIsAdmin, selectUserId } from '../stores/userSlice';
import { useLogin } from '../hooks/useLogin';
import requests from '../utils/Requests';

function LoginScreen() {

    //redux
    const user = useSelector(state => state.user)
    const login = useLogin();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [showAlert, setShowAlert] = useState(false);
    const [alertText, setAlertText] = useState("");
    const [Login, setLogin] = useState()
    const [Password, setPassword] = useState()
    const userName = useSelector(selectUserName);
    const isAdmin = useSelector(selectIsAdmin);
    const id = useSelector(selectUserId);

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
            const result = await requests.post('/loginAutenticate', {
                login: Login,
                password: Password
            });
        
            if (result.data.notFound) {
                setAlertText("Tento login neexistuje, prosím zkontrolujte zadaná data.");
                setShowAlert(true);
            } else if (result.data.wrongPassword) {
                setAlertText("Nesprávné heslo. Prosím, zkontrolujte zadaná data.");
                setShowAlert(true);
            } else {
                if (result.data) {
                    login(result.data);
                    dispatch(loginUser({
                        username: result.data.username,
                        id: result.data.userID,
                        isAdmin: result.data.isAdmin}))
                }
            }
            } catch (error) {
                console.log(error);
                setAlertText("Došlo k chybě při přihlašování. Zkuste to prosím znovu.");
                setShowAlert(true);
            }
            };

            useEffect(() => {
                if (userName) {
                  if (isAdmin) {
                    navigate("/admin");
                  } else {
                    navigate("/browseMatches");
                  }
                }
              }, [userName, isAdmin, navigate]);
              
            return  (

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
                                <Form.Control value={Password} onChange={(e) => setPassword(e.target.value)} type='password' placeholder='Heslo' className='mt-2'></Form.Control>
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