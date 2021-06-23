import React from 'react'
import { useSelector} from "react-redux"
import style from "./SearchPokemon.module.css"
import imgLoading from "../../Img/loading.gif"
import notFound from "../../Img/not-found.png"
import egg from "../../Img/egg.png"



function SearchPokemon() {

const pokemonSearch = useSelector(state => state.pokemon)
const loading = useSelector(state => state.loading)

let pokemonLocal = undefined

console.log(pokemonSearch)


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
        {pokemonLocal === null && <div> <img src={notFound} alt="" /> </div>}
        
        {pokemonLocal !== null && 
        <div className={style.card}> 
        <h2>#{pokemonLocal.id} - {pokemonLocal.nombre}</h2>
        {pokemonLocal.imagen?<div> <img src={pokemonLocal.imagen} alt="" height="250px" width="250px"/></div>: 
        <img src={egg} alt="" height="250px" width="250px"/>}
        <div>
            {pokemonLocal.tipos.map((tipo,i) => 
            <div key={i} className={tipo === "dark"?style.dark:style.types}>{tipo}</div>)}
        </div>

        
     </div>
        
    }
    </div>
    )
}
return (
    <div>
    {loading && <img src={imgLoading} alt="" height="60px" width="60px"/>}

    { pokemonSearch === null && !loading && <div> <img src={notFound} alt="" /></div>}
    
    {pokemonSearch && !loading && 
        <div className={style.card}> 
        <h2>#{pokemonSearch.id} - {pokemonSearch.nombre}</h2>
        {pokemonSearch.imagen?<div> <img src={pokemonSearch.imagen} alt="" height="250px" width="250px"/></div>: 
        <img src={egg} alt="" height="250px" width="250px"/>}
        <div>
            {pokemonSearch.tipos?.map((e,i) => 
            <div key={i} className={e === "bug"? style.bug : e === "fire"? style.fire: e === "shadow"? style.shadow:
            e === "dragon"? style.dragon: e === "electric"? style.electric: e === "fairy"? style.fairy:
            e === "fighting"? style.fighting: e === "fire"? style.fire: e === "flying"? style.flying:
            e === "ghost"? style.ghost: e === "grass"? style.grass: e === "ground"? style.ground:
            e === "ice"? style.ice: e === "poison"? style.poison: e === "psychic"? style.psychic: e === "rock"? style.rock:
            e === "steel"? style.steel: e === "water"? style.water: e=== "dark"? style.dark: e ==="unknown"? style.unknown:
            e=== "normal"? style.normal: false
            }>{e}</div> )}
            <div>HP: {pokemonSearch.hp}</div>
            <div> { pokemonSearch.altura[0]=== ","? "0" + pokemonSearch.altura: pokemonSearch.altura} m. </div>
                <div>{pokemonSearch.peso} Kg.</div>
        </div>

            
        </div>}
    </div>
 )
} 
export default SearchPokemon




