import { Container, Card, Row, Col, Button, Image } from "react-bootstrap";
import { useState, useEffect } from "react";
import requests from '../utils/Requests';

import CP from "../components/CommandPoint.js"
import VP from "../components/VictoryPoint.js"

import left from '../imgs/bg_adeptusMechanicus.jpg'
import right from '../imgs/bg_spaceMarinesBlackTemplars.jpg'
import axios from "axios";

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
        Cp:0,
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

    const [p2,setP2] = useState({
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

    const  [p1Stratagems, setP1Stratagems] = useState([{"Name":"Not Loaded yet"}])
    const  [p2Stratagems, setP2Stratagems] = useState([{"Name":"Not Loaded yet"}])

    const getData = (event) => {
        requests.get('http://localhost:3001/matches/getMatchData?id=1')
            .then(res =>{
                setMatchData(res.data.Match)
                setRoundCounter(res.data.Match.Round)
                setP1(res.data.P1)
                setP2(res.data.P2)

                axios.get("http://localhost:3001/stratagem/getStratagemsForDetachment?detachmentId="+res.data.P1.Detachment).then(detRes =>{
                    setP1Stratagems(detRes.data);
                })

                axios.get("http://localhost:3001/stratagem/getStratagemsForDetachment?detachmentId="+res.data.P2.Detachment).then(detRes =>{
                    setP2Stratagems(detRes.data);
                })
            })
    };

    const syncMatchData = () =>{
        axios.get("http://localhost:3001/matches/syncMatchData?id="+matchData.Id+"&round="+matchData.Round)
    }

    const syncPlayerData = (player) =>{
        var player;
        if(player == 1){
            player = p1
        }else if(player == 2){
            player = p2
        }else{
            return
        }
        axios.get("http://localhost:3001/matches/syncPlayerData?id="+player.Id+"&cp="+player.Cp+"&vp1="+player.VpPrimary1+"&vp2="+player.VpPrimary2+"&vp3="+player.VpPrimary3+"&vp4="+player.VpPrimary4+"&vp5="+player.VpPrimary5+"&vs1="+player.VpSecondary1+"&vs2="+player.VpSecondary2+"&vs3="+player.VpSecondary3+"&vs4="+player.VpSecondary4+"&vs5="+player.VpSecondary5)
    }

    useEffect(() => {
        getData()
    }, []);

    const nextRound = () => {
    if (roundCounter < 5) {
        setRoundCounter(roundCounter + 1)
        var data = matchData
        data.Round++
        setMatchData(data)
        syncMatchData()
    }}

    //Hrač zaplatí CP za Stratagem
    const payCP = (player, cp) =>{
        if (player == 1) {
            setP1(p =>({...p, Cp: p1.Cp - cp}))
        }else if( player == 2){
            setP2(p =>({...p, Cp: p2.Cp - cp}))
        }
    }

    //Hrač získá jedno CP (Zatim nemužeme omezit na kolo kvuli Leviathanu)
    //TODO:: Tyhle 2 funkce dát dohromady. Třeba tak že cena v DB bude zaporna
    const getCP = (player) =>{
        if (player == 1) {
            setP1(p =>({...p, Cp: p1.Cp + 1}))
        }else if( player == 2){
            setP2(p =>({...p, Cp: p2.Cp + 1}))
        }
    }

    const changePoints = (round, player, type, ammount) =>{
        console.log(round,player,type,ammount);
    }

    useEffect(() =>{
        syncPlayerData(1)
    },[p1])

    useEffect(() =>{
        syncPlayerData(2)
    },[p2])


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
                        <Button onClick={nextRound} >Další kolo</Button>
                    </Card.Footer>
                </Card>
                <Row>
                    <Col>
                        <CP CP={p1.Cp} player={1} payCP={payCP} getCP={getCP} stratagems={p1Stratagems}></CP>
                    </Col>
                    <Col>
                        <CP CP={p2.Cp} player={2} payCP={payCP} getCP={getCP} stratagems={p2Stratagems}></CP>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <VP changePoints={changePoints} round={matchData.Round} player={1}
                        VP1={p1.VpPrimary1} VP2={p1.VpPrimary2} VP3={p1.VpPrimary3} VP4={p1.VpPrimary4} VP5={p1.VpPrimary5}
                        VS1={p1.VpSecondary1} VS2={p1.VpSecondary2} VS3={p1.VpSecondary3} VS4={p1.VpSecondary4} VS5={p1.VpSecondary5}
                        >
                        </VP>
                    </Col>
                    <Col><VP></VP>
                    
                    </Col>
                </Row> 

            </Container>
        </div>
    )
}

export default MatchboardView;

