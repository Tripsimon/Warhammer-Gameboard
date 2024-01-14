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
        "Cp":0,
        "Detachment":0,
        "Faction":0,
        "Id":0,
        "Name":"PlayerNotFound",
        "Role":0,
        "VpPrimary1":0,
        "VpPrimary2":0,
        "VpPrimary3":0,
        "VpPrimary4":0,
        "VpPrimary5":0,
        "VpSecondary1":0,
        "VpSecondary2":0,
        "VpSecondary3":0,
        "VpSecondary4":0,
        "VpSecondary5":0,
    });

    const [p2,setP2] = useState(
    {
        "Cp":0,
        "Detachment":0,
        "Faction":0,
        "Id":0,
        "Name":"PlayerNotFound",
        "Role":0,
        "VpPrimary1":0,
        "VpPrimary2":0,
        "VpPrimary3":0,
        "VpPrimary4":0,
        "VpPrimary5":0,
        "VpSecondary1":0,
        "VpSecondary2":0,
        "VpSecondary3":0,
        "VpSecondary4":0,
        "VpSecondary5":0,
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
        console.log(p1);
    }, []);

    const nextRound = () => {
    if (roundCounter < 5) {
        setRoundCounter(roundCounter + 1)
        var data = matchData
        data.Round++
        setMatchData(data)
    }}

    const generateVictoryPointsHolders = ()=>{
        return  <Row><Col><VP VP={p1.vpPrimary1}></VP></Col><Col><VP></VP></Col></Row> 
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
                            <Col><h1 className="text-center" >{p1.Name}</h1></Col>
                            <Col><h1 className="text-center" >VS</h1></Col>
                            <Col><h1 className="text-center" >{p2.Name}</h1></Col>
                        </Row>
                    </Card.Header>
                    <Card.Body>
                        <Row>
                            <Col className="text-center">VP: {p1.VpPrimary1 + p1.VpPrimary2 + p1.VpPrimary3 + p1.VpPrimary4 + p1.VpPrimary5} + {p1.VpSecondary1 + p1.VpSecondary2 +p1.VpSecondary3 + p1.VpSecondary4 + p1.VpSecondary5}</Col>
                            <Col><h3 className="text-center">Aktuální kolo: {roundCounter}</h3></Col>
                            <Col className="text-center">VP: {p2.VpPrimary1 + p2.VpPrimary2 + p2.VpPrimary3 + p2.VpPrimary4 + p2.VpPrimary5} + {p2.VpSecondary1 + p2.VpSecondary2 +p2.VpSecondary3 + p2.VpSecondary4 + p2.VpSecondary5}</Col>
                        </Row>
                    </Card.Body>
                    <Card.Footer>
                        <Button onClick={nextRound} className="btn btn-success" color="success">Další kolo</Button>
                    </Card.Footer>
                </Card>
                <Row>
                    <Col>
                        <CP CP={p1.Cp}></CP>
                    </Col>
                    <Col>
                        <CP CP={p2.Cp}></CP>
                    </Col>
                </Row>

                    {generateVictoryPointsHolders()}

            </Container>
        </div>
    )
}

export default MatchboardView;

