
//DEPRECATED
import React from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

function FactionsEntry(props) {

    const navigate = useNavigate();

    const handleEntry = () => {
        navigate("Tady bude nějaká operace mazání záznamu")
    }
  return (
    <tr>
        <th>
            {props.ID}
        </th>
        <th>
            {props.factionName}
        </th>
        <th>
            {props.description}
        </th>
        <th>
            <Button onClick={() => handleEntry()}>
                Smazat
            </Button>
        </th>
    </tr>
  )
}

export default FactionsEntry