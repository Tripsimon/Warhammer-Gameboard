//Importy
import { Container, Card, Row, Col, Button, Image } from "react-bootstrap";
import { useState, useEffect } from "react";
import requests from '../utils/Requests';
import CP from "../components/CommandPoint.js"
import VP from "../components/VictoryPoint.js"
import left from '../imgs/bg_adeptusMechanicus.jpg'
import right from '../imgs/bg_spaceMarinesBlackTemplars.jpg'

//Komponenta pohledu na zápas
function MatchboardView() {

    //Variables
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

    /**
     * Funkce pro získání dat zápasu
     */
    const getData = () => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        console.log(urlParams.get('key'))
        requests.get('/matches/getMatchData?id='+urlParams.get('key'))
            .then(res =>{
                setMatchData(res.data.Match)
                setRoundCounter(res.data.Match.Round)
                setP1(res.data.P1)
                setP2(res.data.P2)

                requests.get("/stratagem/getStratagemsForDetachment?detachmentId="+res.data.P1.Detachment).then(detRes =>{
                    setP1Stratagems(detRes.data);
                })

                requests.get("/stratagem/getStratagemsForDetachment?detachmentId="+res.data.P2.Detachment).then(detRes =>{
                    setP2Stratagems(detRes.data);
                })
            })
    };

    /**
     * Synchronizace dat zápasu s DB
     */
    const syncMatchData = () =>{
        requests.get("/matches/syncMatchData?id="+matchData.Id+"&round="+matchData.Round)
    }

    /**
     * Synchronizace dat hráče s DB
     * @param {*} player - Identifikátor hráče. 1 nebo 2
     * @returns 
     */
    const syncPlayerData = (player) =>{
        var playerHolder;
        if(player === 1){
            playerHolder = p1
        }else if(player === 2){
            playerHolder = p2
        }else{
            return
        }
        requests.get("/matches/syncPlayerData?id="+playerHolder.Id+"&cp="+playerHolder.Cp+"&vp1="+playerHolder.VpPrimary1+"&vp2="+playerHolder.VpPrimary2+"&vp3="+playerHolder.VpPrimary3+"&vp4="+playerHolder.VpPrimary4+"&vp5="+playerHolder.VpPrimary5+"&vs1="+playerHolder.VpSecondary1+"&vs2="+playerHolder.VpSecondary2+"&vs3="+playerHolder.VpSecondary3+"&vs4="+playerHolder.VpSecondary4+"&vs5="+playerHolder.VpSecondary5)
    }

    //On-Load
    useEffect(() => {
        getData()
    }, []);

    /**
     * Funkce pro přepnutí kola zápasu
     */
    const nextRound = () => {
    if (roundCounter < 5) {
        setRoundCounter(roundCounter + 1)
        var data = matchData
        data.Round++
        setMatchData(data)
        syncMatchData()
    }}

    /**
     * Ukončení hry pokud je kolo 5
     */
    const closeGame = () =>{
        setMatchData(m =>({...m, Round: -1}))
    }

    /**
     * Funkce pro platbu za Stratagem
     * @param {*} player - Identifikátor hráče. 1 nebo 2
     * @param {*} cp - Cena v CP
     */
    const payCP = (player, cp) =>{
        if (player === 1) {
            setP1(p =>({...p, Cp: p1.Cp - cp}))
        }else if( player === 2){
            setP2(p =>({...p, Cp: p2.Cp - cp}))
        }
    }

    //Hrač získá jedno CP (Zatim nemužeme omezit na kolo kvuli Leviathanu)
    //TODO:: Tyhle 2 funkce dát dohromady. Třeba tak že cena v DB bude zaporna
    const getCP = (player) =>{
        if (player === 1) {
            setP1(p =>({...p, Cp: p1.Cp + 1}))
        }else if( player === 2){
            setP2(p =>({...p, Cp: p2.Cp + 1}))
        }
    }

    /**
     * Funce pro změnu vítězných bodů hráče
     * @param {*} round - číslo kola
     * @param {*} player - Pozice hráče. 1 nebo 2
     * @param {*} type  - Primary nebo Secondary
     * @param {*} ammount - o kolik se změní. Odečet pošle zaporné číslo
     * Tohle by mohla byt asi o dost lépe udělaná funkce ale je to co to je
     */
    const changePoints = (round, player, type, ammount) =>{
        if(player === 1){
            switch (round) {
                case 1:
                    if (type === "Primary") {
                        setP1(p =>({...p, VpPrimary1: p1.VpPrimary1 + ammount}))
                    }else if(type === "Secondary"){
                        setP1(p =>({...p, VpSecondary1: p1.VpSecondary1 + ammount}))
                    }
                break;

                case 2:
                    if (type === "Primary") {
                        setP1(p =>({...p, VpPrimary2: p1.VpPrimary2 + ammount}))
                    }else if(type === "Secondary"){
                        setP1(p =>({...p, VpSecondary2: p1.VpSecondary2 + ammount}))
                    }
                break;

                case 3:
                    if (type === "Primary") {
                        setP1(p =>({...p, VpPrimary3: p1.VpPrimary3 + ammount}))
                    }else if(type === "Secondary"){
                        setP1(p =>({...p, VpSecondary3: p1.VpSecondary3 + ammount}))
                    }
                break;

                case 4:
                    if (type === "Primary") {
                        setP1(p =>({...p, VpPrimary4: p1.VpPrimary4 + ammount}))
                    }else if(type === "Secondary"){
                        setP1(p =>({...p, VpSecondary4: p1.VpSecondary4 + ammount}))
                    }
                break;

                case 5:
                    if (type === "Primary") {
                        setP1(p =>({...p, VpPrimary5: p1.VpPrimary5 + ammount}))
                    }else if(type === "Secondary"){
                        setP1(p =>({...p, VpSecondary5: p1.VpSecondary5 + ammount}))
                    }
                break;
            
                default:
                    break;
            }
        }else if(player === 2){
            switch (round) {
                case 1:
                    if (type === "Primary") {
                        setP2(p =>({...p, VpPrimary1: p2.VpPrimary1 + ammount}))
                    }else if(type === "Secondary"){
                        setP2(p =>({...p, VpSecondary1: p2.VpSecondary1 + ammount}))
                    }
                break;

                case 2:
                    if (type === "Primary") {
                        setP2(p =>({...p, VpPrimary2: p2.VpPrimary2 + ammount}))
                    }else if(type === "Secondary"){
                        setP2(p =>({...p, VpSecondary2: p2.VpSecondary2 + ammount}))
                    }
                break;

                case 3:
                    if (type === "Primary") {
                        setP2(p =>({...p, VpPrimary3: p2.VpPrimary3 + ammount}))
                    }else if(type === "Secondary"){
                        setP2(p =>({...p, VpSecondary3: p2.VpSecondary3 + ammount}))
                    }
                break;

                case 4:
                    if (type === "Primary") {
                        setP2(p =>({...p, VpPrimary4: p2.VpPrimary4 + ammount}))
                    }else if(type === "Secondary"){
                        setP2(p =>({...p, VpSecondary4: p2.VpSecondary4 + ammount}))
                    }
                break;

                case 5:
                    if (type === "Primary") {
                        setP2(p =>({...p, VpPrimary5: p2.VpPrimary5 + ammount}))
                    }else if(type === "Secondary"){
                        setP2(p =>({...p, VpSecondary5: p2.VpSecondary5 + ammount}))
                    }
                break;
            
                default:
                    break;
            }
        }
    }

    //Reakce na změnu dat
    useEffect(() =>{
        syncMatchData()
    },[matchData])
    useEffect(() =>{
        syncPlayerData(1)
    },[p1])
    useEffect(() =>{
        syncPlayerData(2)
    },[p2])

    /**
     * Vykreslí možnosti ovládání kola
     * @returns 
     */
    const renderNextRoundControls = () =>{
        let response = null;
        if (matchData.Round > 0 && matchData.Round < 5) {
            response = <Button onClick={nextRound} className="btn btn-success" >Další kolo</Button>;
        }else if(matchData.Round === 5){
            response = <Button onClick={closeGame} className="btn btn-danger">Uzavřít hru</Button>}


        return(
            response
        )
    }

    /**
     * Vykreslí kolo
     * @returns 
     */
    const renderActualScore = () =>{
        if (matchData.Round === -1) {
            let p1Points = p1.VpPrimary1 + p1.VpPrimary2 + p1.VpPrimary3 + p1.VpPrimary4 + p1.VpPrimary5 + p1.VpSecondary1 + p1.VpSecondary2 +p1.VpSecondary3 + p1.VpSecondary4 + p1.VpSecondary5;
            let p2Points = p2.VpPrimary1 + p2.VpPrimary2 + p2.VpPrimary3 + p2.VpPrimary4 + p2.VpPrimary5 + p2.VpSecondary1 + p2.VpSecondary2 +p2.VpSecondary3 + p2.VpSecondary4 + p2.VpSecondary5;
            let winner;
            if(p1Points > p2Points){winner = p1.Name}else if(p1Points < p2Points){winner = p2.Name}else{winner = "Remíza"}
            return(<div>
                <h3> Hra uzavřena</h3>
                <br></br>
                <h3> Vítěz: {winner} </h3>
                </div>
            )
        }else{
            return <h3>Aktuální kolo: {matchData.Round}</h3>
        }
    }

    //Komponenta
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
                            <Col className="text-center"><h3>Vítězné body: {p1.VpPrimary1 + p1.VpPrimary2 + p1.VpPrimary3 + p1.VpPrimary4 + p1.VpPrimary5} + {p1.VpSecondary1 + p1.VpSecondary2 +p1.VpSecondary3 + p1.VpSecondary4 + p1.VpSecondary5}</h3></Col>
                            <Col><h3 className="text-center"> {renderActualScore()}</h3></Col>
                            <Col className="text-center"><h3>Vítězné body: {p2.VpPrimary1 + p2.VpPrimary2 + p2.VpPrimary3 + p2.VpPrimary4 + p2.VpPrimary5} + {p2.VpSecondary1 + p2.VpSecondary2 +p2.VpSecondary3 + p2.VpSecondary4 + p2.VpSecondary5}</h3></Col>
                        </Row>
                    </Card.Body>
                    <Card.Footer>
                        {renderNextRoundControls()}
                    </Card.Footer>
                </Card>
                <Row>
                    <Col>
                        <CP CP={p1.Cp} player={1} round={matchData.Round} payCP={payCP} getCP={getCP} stratagems={p1Stratagems}></CP>
                    </Col>
                    <Col>
                        <CP CP={p2.Cp} player={2} round={matchData.Round} payCP={payCP} getCP={getCP} stratagems={p2Stratagems}></CP>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <VP changePoints={changePoints} round={matchData.Round} player={1}
                        VP1={p1.VpPrimary1} VP2={p1.VpPrimary2} VP3={p1.VpPrimary3} VP4={p1.VpPrimary4} VP5={p1.VpPrimary5}
                        VS1={p1.VpSecondary1} VS2={p1.VpSecondary2} VS3={p1.VpSecondary3} VS4={p1.VpSecondary4} VS5={p1.VpSecondary5}>
                        </VP>
                    </Col>
                    <Col>
                    <VP changePoints={changePoints} round={matchData.Round} player={2}
                        VP1={p2.VpPrimary1} VP2={p2.VpPrimary2} VP3={p2.VpPrimary3} VP4={p2.VpPrimary4} VP5={p2.VpPrimary5}
                        VS1={p2.VpSecondary1} VS2={p2.VpSecondary2} VS3={p2.VpSecondary3} VS4={p2.VpSecondary4} VS5={p2.VpSecondary5}>
                        </VP>
                    </Col>
                </Row> 

            </Container>
        </div>
    )
}

//Export
export default MatchboardView;

