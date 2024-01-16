//Importy

//DEPRECATED
import React from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

//Komponenta pro výpis Heren
function FacilitiesEntry(props) {

    const navigate = useNavigate();

    //Funkce pro mazání heren
    const handleEntry = () => {
        navigate("Tady bude nějaká operace mazání záznamu")
    }

    //Vlastní komponenta
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

//Export
export default FacilitiesEntry