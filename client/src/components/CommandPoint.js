import { Card, Col, Form, Row, Button } from "react-bootstrap";
import { useState, useEffect } from "react"

function CommandPoint(props) {
    const [cpCounter, setCpCounter] = useState(0)

    useEffect(() => {
        setCpCounter(props.CP)
    }, []);

    return <Card style={{ marginTop: '2%' }}>
        <Card.Header><h2 className="text-center" >Command Points: {props.CP} </h2></Card.Header>
        <Card.Body>
            <Card.Title> Použít Stratagem: </Card.Title>
            <Card.Text>
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
            </Card.Text>

        </Card.Body>
        <Card.Footer>
            <Button onClick={() => props.payCP(props.player,5)}>Použít</Button>
            </Card.Footer>
    </Card>;
}

export default CommandPoint;