import React,{useEffect} from 'react'
import { useSelector, useDispatch} from "react-redux";
import style from "./Details.module.css";
import imgLoading from "../../Img/loading.gif";
import egg from "../../Img/egg.png"
import  {pokemonDetail}  from '../../Actions/actions';
import { useParams } from 'react-router-dom';

function Details() {
const  detailPokemon = useSelector(state => state.details)
const loading = useSelector(state => state.loading)
const  dispatch = useDispatch()


let {id} = useParams()


useEffect(() => {
    dispatch(pokemonDetail(id))
   
}, [dispatch,id])



console.log("detalle", detailPokemon)

return (
    <div>
        {detailPokemon ===null && <h1>Ocurrió un error inesperado</h1>}
        {loading && <img className={style.loading}  src={imgLoading} alt="" height="60px" width="60px"/>}

        {detailPokemon && !loading &&
        <div className={style.card}> 
            <h2> #{detailPokemon.id} - {detailPokemon.nombre}</h2>
            {detailPokemon.imagen? 
            <img src={detailPokemon.imagen} alt="" height="180px" width="180px"/>:
            <img src={egg} alt="" height="180px" width="180px"/>}
           

            <div>
            {detailPokemon.tipos?.map(e => 
            <li  key={detailPokemon.id} className={e === "bug"? style.bug : e === "fire"? style.fire: e === "shadow"? style.shadow:
            e === "dragon"? style.dragon: e === "electric"? style.electric: e === "fairy"? style.fairy:
            e === "fighting"? style.fighting: e === "fire"? style.fire: e === "flying"? style.flying:
            e === "ghost"? style.ghost: e === "grass"? style.grass: e === "ground"? style.ground:
            e === "ice"? style.ice: e === "poison"? style.poison: e === "psychic"? style.psychic: e === "rock"? style.rock:
            e === "steel"? style.steel: e === "water"? style.water: e=== "dark"? style.dark: e ==="unknown"? style.unknown:
            e=== "normal"? style.normal: false
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
