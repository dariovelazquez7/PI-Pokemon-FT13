import React, { useState } from "react";
import imgLoading from "../../Img/loading.gif";

import style from "./home.module.css";
import { useSelector} from "react-redux";
import { useEffect } from 'react';
// import {getInitialPokemons} from "../../Actions/actions";
import egg from "../../Img/egg.png";
import {TiMediaRewind, TiMediaFastForward} from "react-icons/ti";
import {Link} from "react-router-dom";







function Home() {
  let allPokemons= useSelector(state => state.initialPokemons)

 
  let allPokemonsLocal= undefined

  const [state, setState] = useState({
    prev: 0,
    next: 12,
    select: "Numeracion"
  })
 


  function savePokemonsLocalStorage () {
  localStorage.setItem("allPokemonLocal", JSON.stringify(allPokemons))
  }

 function getPokemonsLocalStorage (){
  allPokemonsLocal= JSON.parse( localStorage.getItem("allPokemonLocal"))
      
 }

 savePokemonsLocalStorage();
 getPokemonsLocalStorage();
 console.log("local", allPokemonsLocal)

  useEffect(()=>{
    setState({prev: 0, next: 12})

    // dispatch(getInitialPokemons())
  },[])
  
  

  
  
  let initialPokemons =allPokemons.slice(state.prev,state.next)

  //orden
  if(state.select === "Numeracion"){
    allPokemons.sort((a,b) => {
      if(a.id < b.id){
        return -1
      }
      if(a.id > b.id){
        return 1
      }
      return 0
    })
  }
  if(state.select === "A-Z"){
    allPokemons.sort((a,b) => {
      if(a.nombre < b.nombre){
        return -1
      }
      if(a.nombre > b.nombre){
        return 1
      }
      return 0
    })
  }
  const selectOptionOrder = (e) =>{
    setState({...state,[e.target.id]: e.target.value})
  }

//paginado
  const handleNext = () => {    
    if(state.next < allPokemons.length){
      setState({...state, next: state.next+12, prev: state.prev+12})
    }
  }
  
  const handlePrev = () => {
    if(state.prev >= 12)
    setState({...state, next: state.next-12, prev: state.prev-12})
  }
  



if(allPokemons){
    return (
        <div> 
          <div className={style.header}>
            
            <div className="select">
                <select id="select" onChange={selectOptionOrder} >
                    <option  defaultValue >Ordenar por... </option>
                    <option value="A-Z">A-Z</option>
                    <option value="Numeracion">Numeracion (Default)</option>
                </select>
            </div>
            <div className={style.filtro}>
              <span>Fliltrar por...</span>
            </div>
            <div  className={style.SearchBar}>
              <span>boton refresh</span>
            </div>
          </div>
           

            <div className={style.container}>
                {!initialPokemons.length  &&
                <img src={imgLoading} alt="" height="60px" width="60px"/>}

                
                {initialPokemons.length > 0  && initialPokemons.map(pokemon => 
                <div className={style.card} key={pokemon.id}> 
                  {pokemon.imagen? <div><Link to={`/home/pokemon/${pokemon.id}`}> <img src={pokemon.imagen} alt="" height="120px" width="120px"/></Link></div>
                  :<div> <Link to={`/home/pokemon/${pokemon.id}`}><img src={egg} alt="" height="120px" width="120px"/></Link></div>}
                  #{pokemon.id} {pokemon.nombre} </div>)}
            </div>

            <div className={style.div_btn}>
              {initialPokemons.length !== 0 &&
                <button className={style.btn} onClick={handlePrev}> <TiMediaRewind size="1.5em" color="white"/></button> 
              }
              {initialPokemons.length !== 0 &&
                <button className={style.btn} onClick={handleNext}> <TiMediaFastForward size="1.5em" color="white"/> </button>
              }
            </div>
        </div>
    )
  }
}

export default Home
