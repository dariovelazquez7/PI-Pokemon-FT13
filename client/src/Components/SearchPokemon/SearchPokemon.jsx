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
                {pokemonSearch.tipos?.map((tipo,i) => 
                <div key={i} className={tipo === "dark"?style.dark:style.types}>{tipo}</div>)}
                <div>HP: {pokemonSearch.hp}</div>
                <div> { pokemonSearch.altura[0]=== ","? "0" + pokemonSearch.altura: pokemonSearch.altura} m. </div>
                 <div>{pokemonSearch.peso} Kg.</div>
            </div>

            
         </div>}
    </div>
 )
} 
export default SearchPokemon




