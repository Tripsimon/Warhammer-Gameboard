import { Card, Col, Form, Row, Button } from "react-bootstrap";
import { useState } from "react"

function CommandPoint() {
    const [cpCounter, setcpCounter] = useState(0)

    function reduceCP() {
        if (cpCounter > 0) {
            setcpCounter(cpCounter - 1);
        }
    }

    function increaseCP() {
        setcpCounter(cpCounter + 1);
    }

    return <Card style={{ marginTop: '2%' }}>
        <Card.Header><h2 className="text-center" >Command Point: {cpCounter} </h2></Card.Header>
        <Card.Body>
            <Card.Title> Použít Stratagem: </Card.Title>
            <Card.Text>
                <Row>
                    <Col xs="10">
                        <Form.Select aria-label="Default select example">
                            <option>Vybrat</option>
                            {// TODO: Tady dodělat nějak import stratagemů z DB
                            }
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
                    </Col>

                    <Col>
                            <Button>Přidat</Button>
                    </Col>
                </Row>
            </Card.Text>
        </Card.Body>
    </Card>;
}

export default CommandPoint;