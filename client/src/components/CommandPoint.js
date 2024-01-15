import { Card, Col, Form, Row, Button } from "react-bootstrap";
import { useState, useEffect } from "react"

function CommandPoint(props) {
    const [chosenStratagem, setChosenStratagem] = useState(0)
    useEffect(() => {

    }, []);

    const renderStratagems = (event) =>{
            return(
                props.stratagems.map((stratagem,index) => (
                    <option value={index}>{stratagem.Name}</option>
                ))
        )}
        
    return <Card style={{ marginTop: '2%' }}>
        <Card.Header><h2 className="text-center" >Command Points: {props.CP} </h2></Card.Header>
        <Card.Body>
            <Card.Title> Použít Stratagem: </Card.Title>
            <Card.Text>
                    <Col xs="10">
                        <Form.Select aria-label="Default select example" value={chosenStratagem} onChange={(e) => setChosenStratagem(e.target.value)}>
                            <option disabled>Vybrat</option>
                            {renderStratagems()}
                        </Form.Select>
                    </Col>
            </Card.Text>

        </Card.Body>
        <Card.Footer>
            <Button onClick={() => props.payCP(props.player,[props.stratagems[chosenStratagem].Price])}>Použít</Button>
            </Card.Footer>
    </Card>;
}

export default CommandPoint;