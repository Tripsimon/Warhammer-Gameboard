import { Container, Card, Row, Col, Button, Image } from "react-bootstrap";
import { useState, useEffect } from "react";
import requests from '../utils/Requests';

import CP from "../components/CommandPoint.js"
import VP from "../components/VictoryPoint.js"

import left from '../imgs/bg_adeptusMechanicus.jpg'
import right from '../imgs/bg_spaceMarinesBlackTemplars.jpg'

function MatchboardView() {

    const [matchData,setMatchData] = useState(
    {
        "Id":0,
        "Name":"NaN",
        "Round":1,
        "PlayerOne":-1,
        "PlayerTwo":-1
    });

    const [roundCounter, setRoundCounter] = useState(1);

    const [p1,setP1] = useState(
    {
        "Id":0,
        "Name":"NaN",
        "PlayerOne":-1,
        "PlayerTwo":-1
    });

    const [p2,setP2] = useState(
    {
        "Id":0,
        "Name":"NaN",
        "PlayerOne":-1,
        "PlayerTwo":-1
    });

    const getData = (event) => {
        requests.get('/matches/getMatchData?id=1')
            .then(res =>{
                setMatchData(res.data.Match)
                setRoundCounter(res.data.Match.Round)
                setP1(res.data.P1)
                setP2(res.data.P2)
            })
    };

    const updateMatchData = (event) =>{
        //Nejak to zapisovat
    }

    const updatePlayerData = (event) =>{
        //Nejak to zapisovat
    }

    useEffect(() => {
        getData()
        console.log(matchData)
    }, []);

      const nextRound = () => {
        if (roundCounter < 5) {
            setRoundCounter(roundCounter + 1)
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

            <Container className="pt-3">
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
                            <Col className="text-center">VP: </Col>
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

