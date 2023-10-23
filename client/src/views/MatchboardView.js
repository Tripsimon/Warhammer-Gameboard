import { Container, Card, Row, Col, Button, Image } from "react-bootstrap";

import CP from "../components/CommandPoint.js"
import VP from "../components/VictoryPoint.js"
import { useState } from "react";

import left from '../imgs/bg_adeptusMechanicus.jpg'
import right from '../imgs/bg_spaceMarinesBlackTemplars.jpg'

function MatchboardView() {

    const [roundCounter, setroundCounter] = useState(1);

    return (
        <div>
            <div className="bgWrap">
                <Image src={left} className="bgItem" alt="KEKW">
                </Image>
                <Image src={right} className="bgItem" alt="KEKW">
                </Image>
            </div>

            <Container>

                <Image src="../../public/imgs/bg_ig.jpg">

                </Image>
                <Card>
                    <Card.Header>
                        <Row>
                            <Col><h1 className="text-center" >Kropec</h1></Col>
                            <Col><h1 className="text-center" >VS</h1></Col>
                            <Col><h1 className="text-center" >Blengl boy</h1></Col>
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
        </div>
    )
}

export default MatchboardView;

