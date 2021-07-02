import React,{useEffect} from 'react'
import { useSelector , useDispatch} from "react-redux"
import "../Details/Details.css"
import imgLoading from "../../Img/loading.gif"
import wobbu from "../../Img/wobbu.png"
import egg from "../../Img/egg.png"
import  { getTypes}  from '../../Actions/actions';



function SearchPokemon() {

const pokemonSearch = useSelector(state => state.pokemon)
const loading = useSelector(state => state.loading)
const types = useSelector(state => state.types)

const  dispatch = useDispatch()

let pokemonLocal = undefined


useEffect(() => {
    
    dispatch(getTypes()) 
}, [dispatch])

var type =  types?.find(pokemon => pokemon === pokemonSearch?.tipos[0])



function saveLocalStorage () {
   if(pokemonSearch !== undefined){
       localStorage.setItem("localPokemon", JSON.stringify(pokemonSearch))
   }  else return false
}

function getLocalStorage (){
     pokemonLocal= JSON.parse( localStorage.getItem("localPokemon"))
     
}

saveLocalStorage ();
getLocalStorage();



if(pokemonSearch === undefined && !loading){
    return (   
    <div>
        {pokemonLocal === null && <div className={"notFound"}> 
            <h1>Parece que no se encontraron resultados</h1>
            <img src={wobbu}  height="200px" width="150px" alt="" /> 
            <h2>Intenta otra búsqueda</h2>
             </div>}
        
        {pokemonLocal !== null && 
        <div className={`card_${type}`}> 
        <h2>#{pokemonLocal.id} - {pokemonLocal.nombre}</h2>
        {pokemonLocal.imagen?<div> <img src={pokemonLocal.imagen} alt="" height="250px" width="250px"/></div>: 
        <img src={egg} alt="" height="250px" width="250px"/>}
        <div>
            {pokemonLocal.tipos.map((tipo,i) => 
            <div key={i}>{tipo}</div>)}
        </div>

        
     </div>
        
    }
    </div>
    )
}
return (
    <div className={"container"}>
    {loading && <img  className={"loading"} src={imgLoading} alt="" height="60px" width="60px"/>}

    { pokemonSearch === null && !loading && <div> <img src={wobbu}  height="200px" width="150px" alt="" /></div>}
    
    {pokemonSearch && !loading && 
        <div className={`card_${type}`}> 
        <h2>#{pokemonSearch.id} - {pokemonSearch.nombre}</h2>
        {pokemonSearch.imagen?<div> <img src={pokemonSearch.imagen} alt="" height="180px" width="180px"/></div>: 
        <img src={egg} alt="" height="180px" width="180px"/>}
        <div>
            {pokemonSearch.tipos?.map((e,i) => 
            <li key={i} className={e === "bug"? "bug" : e === "fire"? "fire": e === "shadow"? "shadow":
            e === "dragon"? "dragon": e === "electric"? "electric": e === "fairy"? "fairy":
            e === "fighting"? "fighting": e === "fire"? "fire": e === "flying"? "flying":
            e === "ghost"? "ghost": e === "grass"? "grass": e === "ground"? "ground":
            e === "ice"? "ice": e === "poison"? "poison": e === "psychic"? "psychic": e === "rock"? "rock":
            e === "steel"? "steel": e === "water"? "water": e=== "dark"? "dark": e ==="unknown"? "unknown":
            e=== "normal"? "normal": false
            }>{e}</li> )}
        </div>

            <div>HP: {pokemonSearch.hp}</div>
            <div>Ataque: {pokemonSearch.ataque}</div>
            <div>Defensa: {pokemonSearch.defensa}</div>
            <div>Velocidad: {pokemonSearch.velocidad}</div>
            <div>Altura: {pokemonSearch.altura[0]=== ","? "0" + pokemonSearch.altura: pokemonSearch.altura} m.</div>
            <div>Peso: {pokemonSearch.peso} Kg.</div>
            

            
        </div>}
    </div>
 )
} 
export default SearchPokemon




