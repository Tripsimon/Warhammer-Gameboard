//Importy

//DEPRECATED
import React from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

//Sub-Komponenta pro výpis detachmentu
function DetachmentsEntry(props) {
    const navigate = useNavigate();

    //Funkce pro navigaci
    const handleEntry = () => {
        //Tady bylo mazání detachmentu. Nechat to zde ale asi nemůžu protože to nedává smysl v aplikaci
    }

    //Komponenta
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

//Export
export default DetachmentsEntry