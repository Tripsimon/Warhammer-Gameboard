import { Card, Row, Col, Button } from "react-bootstrap";
import {useState} from "react"

function VictoryPoint(){

    const [vpCounter, setvpCounter] = useState(0);

    function reduceVP(){
        setvpCounter(vpCounter -1)
    }

    function increaseVP(){
        setvpCounter(vpCounter +1)
    }

    return <Card style={{ marginTop: '2%' }}>
        <Card.Header><h2>VP</h2></Card.Header>
        <Card.Body>
            <Row>
                <Col>
                    <Button onClick={() => reduceVP()}>-</Button>
                </Col>
                <Col> <h3>{vpCounter}</h3></Col>
                <Col>
                    <Button onClick={ () => increaseVP()} >+</Button>
                </Col>
            </Row>
        </Card.Body>
    </Card>;
}

export default VictoryPoint;