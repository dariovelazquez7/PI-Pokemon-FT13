import React,{useEffect} from 'react'
import Navbar from '../Navbar/navbar'
import { useDispatch,useSelector} from "react-redux"
import {createPokemon} from "../../Actions/actions.js"
import egg from "../../Img/egg.png"
import style from "./PokemonCreated.module.css"
import {Link} from "react-router-dom"

function PokemonCreated() {

const pokemonCreated = useSelector(state => state.pokemonCreated)
const dispatch = useDispatch()

useEffect(() => {
dispatch(createPokemon())
}, [dispatch])

console.log(pokemonCreated)
return (
    <div>
        <Navbar/>
        <h1>Pokemon creado exitosamente!!</h1>
      
        <div className={style.card}> 
            <h2>{pokemonCreated.nombre}</h2>
            {pokemonCreated.imagen? 
            <img src={pokemonCreated.imagen} alt="" height="150px" width="150px"/>:
            <img src={egg} alt="" height="150px" width="150px"/>}
            <div>Ataque: {pokemonCreated.ataque}</div>
            <div>Defensa: {pokemonCreated.defensa}</div>
            <div>HP: {pokemonCreated.hp}</div>
            <div>Velocidad: {pokemonCreated.velocidad}</div>
            <div>Altura: {pokemonCreated.altura} m</div>
            <div>Peso: {pokemonCreated.peso} kg.</div>
            <div> #{pokemonCreated.id} </div>
        </div>
        <Link to={"/form"}>
        <button>back</button>
        </Link>
        
    </div>
)
}

export default PokemonCreated
