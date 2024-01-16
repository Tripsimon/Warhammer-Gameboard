//Importy
import { Card, Col, Form, Row, Button, CardSubtitle } from "react-bootstrap";
import { useState, useEffect } from "react"

//Sub-Komponenta pro zobrazení Command Points hráče
function CommandPoint(props) {
    const [chosenStratagem, setChosenStratagem] = useState(undefined)

    //Výpis stratagemů na výběr
    const renderStratagems = (event) =>{
            return(
                props.stratagems.map((stratagem,index) => (
                    <option value={index} key={index}>{stratagem.Name}</option>
                ))
        )}
    
    //Výpis popisu stratagemu
    const renderExplainStratagem = () =>{
        if(chosenStratagem != null){
            return(<CardSubtitle className="ml-2">{props.stratagems[chosenStratagem].Ability}</CardSubtitle>)
        }
    }

    //Middleware pro kontrolu, zda je vybranýstratagem
    const prepareToPay = () =>{
        if(chosenStratagem != undefined){
            props.payCP(props.player,[props.stratagems[chosenStratagem].Price])
        }
    }

    //Výpis ovládací lišty
    const renderControls = () =>{
        if(props.round == -1){return}
        return (
        <div>
        <Card.Footer>
            <Button  onClick={() => prepareToPay()}>Použít Stratagem</Button>
            <Button  className="btn btn-success mx-2" color="success" onClick={() => props.getCP(props.player)}>Přidat CP</Button>
        </Card.Footer>
        </div>
        )
    }
    
    //Komponenta
    return <Card style={{ marginTop: '2%' }}>
        <Card.Header><h3 className="text-center" >Command Points: {props.CP} </h3></Card.Header>
        <Card.Body>
            <Card.Title> Použít Stratagem: </Card.Title>
            <Card.Text>

                        <Form.Select aria-label="Default select example" value={chosenStratagem} onChange={(e) => setChosenStratagem(e.target.value)}>
                            <option value=""  defaultValue={undefined}>Vybrat</option>
                            {renderStratagems()}
                        </Form.Select>
            </Card.Text>
            {renderExplainStratagem()}
        </Card.Body>
            {renderControls()}
    </Card>;
}

//Export
export default CommandPoint;