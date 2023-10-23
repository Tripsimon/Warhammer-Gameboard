import { Card, Row, Col, Button } from "react-bootstrap";
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
            <Row>
                <Col>
                    <h3 className="text-center" >Primary</h3>
                </Col>

                <Col>
                    <h2 className="text-center" >VP</h2>
                </Col>

                <Col>
                <h3 className="text-center" >Secondary</h3>
                </Col>
            </Row>

        </Card.Header>

        <Card.Body>
            <Row>
                <Col>
                    <Button onClick={() => reduceVictoryPointPrimary()}>-</Button>
                </Col>
                <Col> <h3>{vpCounterPrimary}</h3></Col>
                <Col>
                    <Button onClick={() => increaseVictoryPointPrimary()} >+</Button>
                </Col>

                <Col>
                    <Button onClick={() => reduceVictoryPointSecondary()}>-</Button>
                </Col>
                <Col> <h3>{vpCounterSecondary}</h3></Col>
                <Col>
                    <Button onClick={() => increaseVictoryPointSecondary()} >+</Button>
                </Col>
            </Row>
        </Card.Body>
    </Card>;
}

export default VictoryPoint;