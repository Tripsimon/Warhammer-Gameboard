import { Container, Card, Row, Col, Button, Image } from "react-bootstrap";

import CP from "../components/CommandPoint.js"
import VP from "../components/VictoryPoint.js"
import { useState } from "react";

import left from '../imgs/bg_adeptusMechanicus.jpg'
import right from '../imgs/bg_spaceMarinesBlackTemplars.jpg'

function MatchboardView() {

    const [roundCounter, setroundCounter] = useState(1);

    const nextRound = () => {
        if (roundCounter < 5) {
            setroundCounter(roundCounter + 1)
        }
    }

    const generateVictoryPointsHolders = ()=>{
        return  <Row><Col><VP></VP></Col><Col><VP></VP></Col></Row> 
    }

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
                            <Col className="text-center">VP:</Col>
                            <Col><h3 className="text-center">Aktuální kolo: {roundCounter}</h3></Col>
                            <Col className="text-center">VP:</Col>
                        </Row>
                    </Card.Body>
                    <Card.Footer>
                        <Button onClick={nextRound} className="btn btn-success" color="success">Další kolo</Button>
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

                    {generateVictoryPointsHolders()}

            </Container>
        </div>
    )
}

export default MatchboardView;

