import React,{useEffect} from 'react'
import Navbar from '../Navbar/navbar'
import { useDispatch,useSelector} from "react-redux"
import {createPokemon} from "../../Actions/actions.js"
import egg from "../../Img/egg.png"
import "../Details/Details.css"
import {Link} from "react-router-dom"
import {TiArrowBack} from "react-icons/ti";
import  { getTypes}  from '../../Actions/actions';


function PokemonCreated() {

const pokemonCreated = useSelector(state => state.pokemonCreated)
const types = useSelector(state => state.types)

const dispatch = useDispatch()

useEffect(() => {
dispatch(createPokemon())
dispatch(getTypes()) 
}, [dispatch])

var prueba = pokemonCreated.tipos && pokemonCreated.tipos[0]
var type =  types?.find(pokemon => pokemon === prueba)

return (
    <div className={"container"}>
        <Navbar/>
        <h1>Pokemon creado exitosamente!!</h1>
      
        <div className={`card_${type}`}> 
            <h2>#{pokemonCreated.id} - {pokemonCreated.nombre}</h2>
            {pokemonCreated.imagen? 
            <img src={pokemonCreated.imagen} alt="" height="150px" width="150px"/>:
            <img src={egg} alt="" height="150px" width="150px"/>}
            <div>
                {pokemonCreated.tipos?.slice(0,2) && pokemonCreated.tipos?.map((e,i)=> 
                <li  key={i} className={e === "bug"? "bug" : e === "fire"? "fire": e === "shadow"? "shadow":
                e === "dragon"? "dragon": e === "electric"? "electric": e === "fairy"? "fairy":
                e === "fighting"? "fighting": e === "fire"? "fire": e === "flying"? "flying":
                e === "ghost"? "ghost": e === "grass"? "grass": e === "ground"? "ground":
                e === "ice"? "ice": e === "poison"? "poison": e === "psychic"? "psychic": e === "rock"? "rock":
                e === "steel"? "steel": e === "water"? "water": e=== "dark"? "dark": e ==="unknown"? "unknown":
                e=== "normal"? "normal": false
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
