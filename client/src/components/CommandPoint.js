import { Card, Row, Col, Button } from "react-bootstrap";
import {useState} from "react"

function CommandPoint() {
    const [cpCounter, setcpCounter] = useState(0)

    function reduceCP() {
        if (cpCounter > 0) {
            setcpCounter(cpCounter -1);        
        }
    }

    function increaseCP(){
        setcpCounter(cpCounter+1);
    }

    return <Card style={{ marginTop: '2%' }}>
        <Card.Header><h2>CP</h2></Card.Header>
        <Card.Body>
            <Row>
                <Col>
                    <Button onClick={() => reduceCP()}>-</Button>
                </Col>
                <Col> <h3>{cpCounter}</h3></Col>
                <Col>
                    <Button onClick={ () => increaseCP()} >+</Button>
                </Col>
            </Row>
        </Card.Body>
    </Card>;
}

export default CommandPoint;