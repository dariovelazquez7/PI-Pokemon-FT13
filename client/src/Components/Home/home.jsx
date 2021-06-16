import React from "react";
import imgLoading from "../../Img/loading.gif"
import pokemon from "../../Img/pokemon.png"
import style from "./home.module.css";
import { useDispatch, useSelector} from "react-redux"
import { useEffect } from 'react';
import {getInitialPokemons} from "../../Actions/actions";


function Home() {

  const initialPokemons = useSelector(state => state.initialPokemons.slice(0,12))


  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getInitialPokemons())
  },[dispatch])

    return (
        <div>        
              <img src={pokemon} alt="" height="120px" width="335px"/>
            <div className={style.container}>
                 {!initialPokemons.length && <img src={imgLoading} alt="" height="60px" width="60px"/>}
                  {initialPokemons.length > 0  && initialPokemons.map(pokemon => 
                    <div className={style.card} key={pokemon.id}> 
                    <div>
                      <img src={pokemon.imagen} alt="" height="135px" width="135px"/>
                    </div>
                    #{pokemon.id} {pokemon.nombre}
                    </div>)}   
            </div>
                   
        </div>
    )
}

export default Home
