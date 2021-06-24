import React,{useEffect} from 'react'
import Navbar from '../Navbar/navbar'
import { useDispatch,useSelector} from "react-redux"
import {createPokemon} from "../../Actions/actions.js"
import egg from "../../Img/egg.png"
import style from "./PokemonCreated.module.css"
import {Link} from "react-router-dom"
import {TiArrowBack} from "react-icons/ti"

function PokemonCreated() {

const pokemonCreated = useSelector(state => state.pokemonCreated)
const dispatch = useDispatch()

useEffect(() => {
dispatch(createPokemon())
}, [dispatch])

console.log(pokemonCreated)
return (
    <div className={style.container}>
        <Navbar/>
        <h1>Pokemon creado exitosamente!!</h1>
      
        <div className={style.card}> 
            <h2>#{pokemonCreated.id} - {pokemonCreated.nombre}</h2>
            {pokemonCreated.imagen? 
            <img src={pokemonCreated.imagen} alt="" height="150px" width="150px"/>:
            <img src={egg} alt="" height="150px" width="150px"/>}
            <div>
                {pokemonCreated.tipos?.map(e=> 
                <li  key={pokemonCreated.id} className={e === "bug"? style.bug : e === "fire"? style.fire: e === "shadow"? style.shadow:
                e === "dragon"? style.dragon: e === "electric"? style.electric: e === "fairy"? style.fairy:
                e === "fighting"? style.fighting: e === "fire"? style.fire: e === "flying"? style.flying:
                e === "ghost"? style.ghost: e === "grass"? style.grass: e === "ground"? style.ground:
                e === "ice"? style.ice: e === "poison"? style.poison: e === "psychic"? style.psychic: e === "rock"? style.rock:
                e === "steel"? style.steel: e === "water"? style.water: e=== "dark"? style.dark: e ==="unknown"? style.unknown:
                e=== "normal"? style.normal: false
                    }>{e}</li>)}
            </div>
            <div>Ataque: {pokemonCreated.ataque}</div>
            <div>Defensa: {pokemonCreated.defensa}</div>
            <div>HP: {pokemonCreated.hp}</div>
            <div>Velocidad: {pokemonCreated.velocidad}</div>
            <div>Altura: {pokemonCreated.altura} m</div>
            <div>Peso: {pokemonCreated.peso} kg.</div>
            
        </div>
        <Link to={"/form"}>
        <button><TiArrowBack/> </button>
        </Link>
        
    </div>
)
}

export default PokemonCreated
