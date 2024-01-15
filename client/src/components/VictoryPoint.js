import { Card, Table ,Row, Col, Button, Form } from "react-bootstrap";
import { useState } from "react"

function VictoryPoint(props) {
    return <Card style={{ marginTop: '2%' }}>
        <Card.Header>
            <h3 className="text-center">Vítězné body</h3>
        </Card.Header>

        <Card.Body>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Kolo</th>
                        <th>Primární</th>
                        <th>Sekundární</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>1:</th>
                        <th>{props.VP1}</th>
                        <th>{props.VS1}</th>
                    </tr>
                    <tr>
                        <th>2:</th>
                        <th>{props.VP2}</th>
                        <th>{props.VS2}</th>
                    </tr>
                    <tr>
                        <th>3:</th>
                        <th>{props.VP3}</th>
                        <th>{props.VS3}</th>
                    </tr>
                    <tr>
                        <th>4:</th>
                        <th>{props.VP4}</th>
                        <th>{props.VS4}</th>
                    </tr>
                    <tr>
                        <th>5:</th>
                        <th>{props.VP5}</th>
                        <th>{props.VS5}</th>
                    </tr>
                </tbody>
            </Table>
        </Card.Body>
        <Card.Footer>
            <Button variant="success" onClick={() => {props.changePoints(props.round, props.player, "VP", 1)}} >Primární +</Button>{' '}
            <Button variant="warning">Primární -</Button>{' '}
            <Button variant="success">Sekundární +</Button>{' '}
            <Button variant="warning">Sekundární -</Button>{' '}
        </Card.Footer>
    </Card>;
}

export default VictoryPoint;