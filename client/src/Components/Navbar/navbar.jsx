import React, { useState } from "react";

import { useDispatch} from "react-redux"

import style from "./navbar.module.css"
import {BsSearch} from "react-icons/bs"
import {Link, useHistory} from "react-router-dom"
import {getPokemon} from "../../Actions/actions"




function Navbar() {
const dispatch = useDispatch()
const [state, setState] = useState({name: ""})

    
const handleChange = (e) => {
    setState({name: e.target.value });
}
const history = useHistory()


const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getPokemon(state.name.toLowerCase()))
    history.push("/home/pokemon")
    
}

    return (  
        <header className= {style.header}>
            <div> <Link to ={"/home"}>Home</Link> </div>
            <div> <Link to={"/form"}>Crea tu Pokemón!</Link></div>           
            <div> About</div>
        <nav>
            <form  >
                <div className={style.form}>
                    <input type="search" 
                    autoComplete="off"
                    
                    placeholder="Busca por nombre..."
                    onChange={handleChange}
                    />
                  
                    <button className={style.btn} onClick={handleSubmit}> 
                        {<BsSearch/>}
                    </button>
                   
                </div>
            </form>
        </nav>
        </header>
       
    )
}

export default Navbar;
