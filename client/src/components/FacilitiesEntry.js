import React from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

function FacilitiesEntry(props) {

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
            {props.facilityName}
        </th>
        <th>
            {props.login}
        </th>
        <th>
            <Button onClick={() => handleEntry()}>
                Smazat
            </Button>
        </th>
    </tr>
  )
}

export default FacilitiesEntry