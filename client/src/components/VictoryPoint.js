import { Card, Row, Col, Button, Form } from "react-bootstrap";
import { useState } from "react"

function VictoryPoint() {

    const [vpCounterPrimary, setvpCounterPrimary] = useState(0);
    const [vpCounterSecondary, setvpCounterSecondary] = useState(0);

    function reduceVictoryPointPrimary() {
        setvpCounterPrimary(vpCounterPrimary - 1)
    }

    function increaseVictoryPointPrimary() {
        setvpCounterPrimary(vpCounterPrimary + 1)
    }

    function reduceVictoryPointSecondary() {
        setvpCounterSecondary(vpCounterSecondary - 1)
    }

    function increaseVictoryPointSecondary() {
        setvpCounterSecondary(vpCounterSecondary + 1)
    }

    return <Card style={{ marginTop: '2%' }}>
        <Card.Header> 
            <div>Round: 1</div>
        </Card.Header>

        <Card.Body>
            <Card.Title>
                <Row>
                    <Col>
                        <Button onClick={() => reduceVictoryPointPrimary()}>-</Button>
                    </Col>
                    <Col xs="6">
                        Primary victory points:
                    </Col>
                    <Col>
                        <Button onClick={() => increaseVictoryPointPrimary()} >+</Button>
                    </Col>
                </Row>
            </Card.Title>
            <Card.Title>
                Secondary Victory Points
            </Card.Title>
            <Row>
            <Form.Select aria-label="Default select example">
                            <option>Vybrat</option>
                            {// TODO: Tady dodělat nějak import stratagemů z DB
                            }
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
            </Row>
        </Card.Body>
    </Card>;
}

export default VictoryPoint;