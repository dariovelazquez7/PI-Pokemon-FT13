import React from 'react'
import { useSelector, useDispatch} from "react-redux"
import style from "./Details.module.css"
import imgLoading from "../../Img/loading.gif"
import notFound from "../../Img/not-found.png"
import egg from "../../Img/egg.png"
import {actionLoading} from "../../Actions/actions"

function Details() {

const dispatch = useDispatch()
const pokemonDetail = useSelector(state => state.pokemon)
const loading = useSelector(state => state.loading)

let pokemonLocal = undefined
console.log(pokemonDetail)
console.log("local:",pokemonLocal)

function saveLocalStorage () {
   if(pokemonDetail){
       localStorage.setItem("localPokemon", JSON.stringify(pokemonDetail))
   }
}

function getLocalStorage (){
     pokemonLocal= JSON.parse( localStorage.getItem("localPokemon"))
     dispatch(actionLoading)
}


saveLocalStorage ();
getLocalStorage();
console.log(loading)



if(pokemonDetail === undefined && !loading){
    return (
        <div>
    { pokemonLocal === undefined && !loading && <div> <img src={notFound} alt="" /> </div>}
    
   {pokemonLocal !== undefined && !loading && 
    <div className={style.card}> 
    <div> 
    </div>
    {pokemonLocal.image?
    <div> 
     <img src={pokemonLocal.image} alt="" height="150px" width="150px"/>
     </div> : <img src={egg} alt="" height="150px" width="150px"/>
    }
     <div>
         #{pokemonLocal.id} - {pokemonLocal.name} 
     </div>
     </div>
    }
    </div>
    )
}
return (
    <div>
    {loading && <img src={imgLoading} alt="" height="60px" width="60px"/>}

    { pokemonDetail === null && !loading && <div> <img src={notFound} alt="" />
        </div>}
    
   {pokemonDetail && !loading && 
    <div className={style.card}> 
    <div> 
    {/* <img src={pokemon} alt="" height="60px" width="60px"/>  */}
    </div>
    {pokemonDetail.image?
    <div> 
     <img src={pokemonDetail.image} alt="" height="150px" width="150px"/>
     </div> : <img src={egg} alt="" height="150px" width="150px"/>
    }
     <div>
         #{pokemonDetail.id} - {pokemonDetail.name} 
     </div>
     </div>
    }
    </div>
 )
} 
export default Details




