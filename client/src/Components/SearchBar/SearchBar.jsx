import React, { useState} from "react";
import {BsSearch} from "react-icons/bs"
import { useHistory} from "react-router-dom"
import {getPokemon} from "../../Actions/actions"
import { useDispatch } from "react-redux"

function SearchBar() {

const [localState, setLocalState] = useState("")
const dispatch = useDispatch()
const history = useHistory()

    
const handleChange = (e) => {
    setLocalState(e.target.value);
}

const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getPokemon(localState.toLowerCase()))
    history.push(`/home/pokemon`) 
}

return (
    <div>
        <form  >
            <div >
                <input type="search"
                autoComplete="off"
                placeholder="Busca por nombre..."
                onChange={handleChange}
                />
                <button onClick={handleSubmit}> 
                    {<BsSearch/>}
                </button>
            
            </div>
        </form>
    </div>
)
}

export default SearchBar
