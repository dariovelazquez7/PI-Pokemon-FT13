import React from "react";
import pokemon from "../../Img/pokemon.png";
import style from "./navbar.module.css"
import {Link} from "react-router-dom"
import SearchBar from "../SearchBar/SearchBar";
import {CgPokemon, CgHome, CgToday} from "react-icons/cg"



function Navbar() {



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
                    <CgPokemon fontSize="36px" />
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

                <div><img src={pokemon} alt="" height="70px" width="200px"/></div>
            <div>
                <SearchBar/>
            </div>
        </header>
       
    )
}

export default Navbar;
