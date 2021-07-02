import React,{useEffect} from 'react'
import { useSelector, useDispatch} from "react-redux";
// import from "./Details.module.css";
import "./Details.css"
import imgLoading from "../../Img/loading.gif";
import egg from "../../Img/egg.png"
import escuero from "../../Img/escuero.png";
import  {pokemonDetail, getTypes}  from '../../Actions/actions';
import { useParams } from 'react-router-dom';

function Details() {
const  detailPokemon = useSelector(state => state.details)
const loading = useSelector(state => state.loading)
const types = useSelector(state => state.types)

const  dispatch = useDispatch()


let {id} = useParams()


useEffect(() => {
    dispatch(pokemonDetail(id))
    dispatch(getTypes()) 
}, [dispatch,id ])


var type =  types?.find(pokemon => pokemon === detailPokemon?.tipos[0])

if(detailPokemon ===null && !loading){
    return(
        <div className={"error"}>
            <h1>Vamo' a calmarno'</h1>
            <img src={escuero} height="250px" width="250px"  alt=""/>
            <h2>Has modificado el id del pokemon por uno no válido.</h2>
        </div>
        )
} else 
return (
    <div className={"container"}>
      
       {loading && <img className={"loading"}  src={imgLoading} alt="" height="60px" width="60px"/>}

        {detailPokemon && !loading &&
        <div className={`card_${type}`}> 
            <h2> #{detailPokemon.id} - {detailPokemon.nombre}</h2>
            
            {detailPokemon.imagen? 
            <img src={detailPokemon.imagen} alt="" height="180px" width="180px"/>:
            <img src={egg} alt="" height="180px" width="180px"/>}
           

            <div>
            {detailPokemon.tipos?.map((e,index) => 
            <li  key={index} className={e === "bug"? "bug" : e === "fire"? "fire": e === "shadow"? "shadow":
            e === "dragon"? "dragon": e === "electric"? "electric": e === "fairy"? "fairy":
            e === "fighting"? "fighting": e === "fire"? "fire": e === "flying"? "flying":
            e === "ghost"? "ghost": e === "grass"? "grass": e === "ground"? "ground":
            e === "ice"? "ice": e === "poison"? "poison": e === "psychic"? "psychic": e === "rock"? "rock":
            e === "steel"? "steel": e === "water"? "water": e=== "dark"? "dark": e ==="unknown"? "unknown":
            e=== "normal"? "normal": false
                }>{e}</li>)}
            </div>
            
            <div>HP: {detailPokemon.hp}</div>
            <div>Ataque: {detailPokemon.ataque}</div>
            <div>Defensa: {detailPokemon.defensa}</div>
            <div>Velocidad: {detailPokemon.velocidad}</div>
            <div>Altura: {detailPokemon.altura[0]=== ","? "0" + detailPokemon.altura: detailPokemon.altura} m.</div>
            <div>Peso: {detailPokemon.peso} Kg.</div>
           
            
        </div>
        }
    </div>
 )
    
}

export default Details
