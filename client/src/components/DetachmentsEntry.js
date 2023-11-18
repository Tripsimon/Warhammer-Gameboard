import React from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

function DetachmentsEntry(props) {

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
            {props.detachmentName}
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

export default DetachmentsEntry