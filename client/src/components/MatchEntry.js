
//DEPRECATED
import React from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

function MatchEntry(props) {

    const navigate = useNavigate();

    const handleEntry = () => {
        navigate("/match?key="+props.id)
    }
  return (
    <tr>
        <th>
            {props.name}
        </th>
        <th>
            {props.state}
        </th>
        <th>
            <Button onClick={() => handleEntry()}>
                Otevřít
            </Button>
        </th>
    </tr>
  )
}

export default MatchEntry