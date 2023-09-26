import { Container, Card, Row, Col } from "react-bootstrap";

import CP from "./CommandPoint.js"
import VP from "./VictoryPoint.js"

function gamegoardComponent(){
    return(
        <Container style={{marginTop: '1%'}}>
            <Card>
                <Card.Header>
                    <Row>
                        <Col><h1>Kropec</h1></Col>
                        <Col><h1>VS</h1></Col>
                        <Col><h1> Blengl boy</h1></Col>
                    </Row>
                </Card.Header>
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

export default gamegoardComponent;  

