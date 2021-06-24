import React, { useState} from "react";
import pokemon from "../../Img/pokemon.png";
import style from "./navbar.module.css"
import {Link} from "react-router-dom"
import {ImSearch} from "react-icons/im"
import { useHistory} from "react-router-dom"
import {CgPokemon, CgHome, CgToday} from "react-icons/cg"
import {getPokemon} from "../../Actions/actions"
import { useDispatch } from "react-redux"



function Navbar() {

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
        <header className= {style.header}>
            <nav className= {style.navbar}>
                <div>
            <Link to ={"/home"}>
                    <li className= {style.home}>
                    <CgHome fontSize="30px"/>
                    <span>Home</span>
                    </li>

            </Link>     


            <Link to={"/form"}> 
            <li>
                    <CgPokemon fontSize="36px"/>
                    <span>Crea tu Pokemón! </span> 
            </li>
            </Link> 


            <Link to={"/"}>
            <li className= {style.presentacion}>
                    <CgToday fontSize="31px"/>
                    <span>Presentacion</span>
            </li>
            </Link>
                </div>
            </nav>
                <Link to={"/home"}>
                <div><img src={pokemon} alt="" height="70px" width="200px" /></div>
                </Link>
            <div>
            <form  >
            <div className={style.btn_search}>
                <input type="text"
                autoComplete="off"
                placeholder="Busca por nombre..."
                onChange={handleChange}
                />
                <button onClick={handleSubmit}> <ImSearch/></button>
            </div>
        </form>
            </div>
        </header>
       
    )
}

export default Navbar;
