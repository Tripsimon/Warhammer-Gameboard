import { Container, Card, Row, Col, Button } from "react-bootstrap";

import CP from "./CommandPoint.js"
import VP from "./VictoryPoint.js"
import { useState } from "react";

function GamegoardComponent(){

    const [roundCounter, setroundCounter] = useState(1);

    return(
        <Container style={{marginTop: '1%'}}>
            <Card>
                <Card.Header>
                    <Row>
                        <Col><h1>Kropec</h1></Col>
                        <Col><h1>VS</h1></Col>
                        <Col><h1>Blengl boy</h1></Col>
                    </Row>
                </Card.Header>
                <Card.Body>
                    <Row>
                        <Col></Col>
                        <Col><h3>Momentální kolo: {roundCounter}</h3></Col>
                        <Col></Col>
                    </Row>
                </Card.Body>
                <Card.Footer>
                    <Button className="btn btn-success" color="success">Další kolo</Button>
                </Card.Footer>
            </Card>
            <Row>
                <Col>
                    <CP></CP>
                </Col>
                <Col>
                    <CP></CP>
                </Col>
            </Row>

        
            <Row>
                <Col><VP></VP></Col>
                <Col><VP></VP></Col>
                
            </Row>
        </Container>
    )}

export default GamegoardComponent;  

