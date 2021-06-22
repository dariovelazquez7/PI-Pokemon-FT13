import React, { useState, useEffect } from "react";
import imgLoading from "../../Img/loading.gif";

import style from "./home.module.css";
import { useSelector} from "react-redux";

// import {getInitialPokemons} from "../../Actions/actions";
import egg from "../../Img/egg.png";
import {TiMediaRewind, TiMediaFastForward} from "react-icons/ti";
import {Link} from "react-router-dom";




function Home() {
let allPokemons= useSelector(state => state.initialPokemons)


let arrayCheckbox = []
let allPokemonsLocal= undefined


  const [state, setState] = useState({
    prev: 0,
    next: 12,
    select: "Numeracion",
    check: [],
    filtroPorTipo: undefined,
    filtro: false
  })

  useEffect(() => {
    setState({ prev: 0, next: 12, filtro: false})
    
  }, [])


  // function savePokemonsLocalStorage () {
  //   localStorage.setItem("allPokemonLocal", JSON.stringify(allPokemons))
  // }
  // savePokemonsLocalStorage();
  
  // function getPokemonsLocalStorage (){
  //   allPokemonsLocal= JSON.parse( localStorage.getItem("allPokemonLocal"))
    
  // }
  // getPokemonsLocalStorage(); 
 

//filtrado//
const CheckboxTypes =() => {
  let checks = document.querySelectorAll(".check")
  checks.forEach(e => {
      if(e.checked === true){
        arrayCheckbox.push(e.id)
        if(arrayCheckbox.length > 1){
          e.checked =false
          console.log(arrayCheckbox)
        }
        }
  });
}

function handleChange () { 
  setState({...state,  check:arrayCheckbox })

  CheckboxTypes()
}


function handleSubmit(){
  if(state.check)
  var checktype = state.check[0]
  var lista= allPokemons.filter(pokemon => pokemon.tipos.includes(checktype))
  setState({...state, filtroPorTipo: lista})
}

if(state.filtroPorTipo?.length > 0){
  allPokemons =  state.filtroPorTipo
}
console.log("all", allPokemons)
let baseDatos = []
function filtradoBaseDatos() {
  setState({...state, filtro: !state.filtro})
   baseDatos = allPokemons.filter(pokemon => pokemon.id > 898)
  }
  // if(state.filtro === true){
  //   allPokemons= baseDatos
  // }
  console.log("why",baseDatos)
let initialPokemons = allPokemons?.slice(state.prev,state.next)




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
  if(state.select === "Z-A"){
    allPokemons.sort((b,a) => {
      if(a.nombre < b.nombre){
        return -1
      }
      if(a.nombre > b.nombre){
        return 1
      }
      return 0
    })
  }
  if(state.select === "Fuerza"){
    allPokemons.sort((b,a) => {
      if(a.ataque < b.ataque){
        return -1
      }
      if(a.ataque > b.ataque){
        return 1
      }
      return 0
    })
  }
  if(state.select === "Debil"){
    allPokemons.sort((a,b) => {
      if(a.ataque < b.ataque){
        return -1
      }
      if(a.ataque > b.ataque){
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
  


    return (
      <div> 
          <div className={style.header}>
            
            <div className="select">
                <select id="select" onChange={selectOptionOrder} >
                    <option  defaultValue >Ordenar por... </option>
                    <option value="A-Z">A-Z</option>
                    <option value="Z-A">Z-A</option>
                    <option value="Fuerza">Mas Fuerte</option>
                    <option value="Debil">Mas Debil</option>
                    <option value="Numeracion">Numeracion (Default)</option>
                </select>
            </div>
            <div className={style.filtro}>
             

            <input type="checkbox" id="btn-modal" className={style.btn_modal}/>
            <label htmlFor="btn-modal"className={style.lbl_modal}>Filtra por tipo...</label>
            <div className={style.modal}> 
            <div className={style.contenedor}>
                <header>Filtra por tipo</header>
                <label htmlFor="btn-modal" className={style.lbl_close_modal}>X</label>
                <div className={style.contenido}> 
                <div className="types">
            <div>
                <label htmlFor="normal">
                    <input id="normal" type="checkbox" className="check" onChange={handleChange}/>
                    <span>Normal</span>
                </label>
            </div>
            <div>
                <label htmlFor="fighting">
                    <input id="fighting"  type="checkbox" className="check" onChange={handleChange}/>
                    <span>Fighting</span>
                </label>
            </div>
            <div>
                <label htmlFor="flying">
                    <input id="flying" type="checkbox" className="check" onChange={handleChange}/>
                    <span>Flying</span>
                 </label>
            </div>
            <div>
                <label htmlFor="poison">
                    <input id="poison" type="checkbox" className="check" onChange={handleChange}/>
                    <span>Poison</span>
                </label>
            </div>
            <div>
                <label htmlFor="ground">
                <input id="ground" type="checkbox" className="check" onChange={handleChange}/>
                <span>Ground</span>
                </label>
            </div>
            <div>
                <label htmlFor="rock">
                    <input id="rock" type="checkbox" className="check" onChange={handleChange}/>
                    <span>Rock</span>
                </label>
            </div>
            <div>
                <label htmlFor="bug">
                <input id="bug" type="checkbox" className="check" onChange={handleChange}/>
                  <span>Bug</span>
                </label>
            </div>
            <div>
                <label htmlFor="ghost">
                <input id="ghost" type="checkbox" className="check" onChange={handleChange}/>
                <span>Ghost</span>
                </label>
            </div>
            <div>
                <label htmlFor="steel">
                <input id="steel" type="checkbox" className="check" onChange={handleChange}/>
                    <span>Steel</span>
                </label>
            </div>
            <div>
                <label htmlFor="fire">
                <input id="fire" type="checkbox" className="check" onChange={handleChange}/>
                <span>Fire</span>
                </label>
            </div>
            <div>
                <label htmlFor="water">
                <input id="water" type="checkbox" className="check" onChange={handleChange}/>
                <span>Water</span>
                </label>
            </div>
            <div>
                <label htmlFor="grass">
                <input id="grass" type="checkbox" className="check" onChange={handleChange}/>
                <span>Grass</span>
                </label>
            </div>
            <div>
                <label htmlFor="electric">
                <input id="electric" type="checkbox" className="check" onChange={handleChange}/>
                <span>Electric</span>
                </label>
            </div>
            <div>
                <label htmlFor="psychic">
                <input id="psychic" type="checkbox" className="check" onChange={handleChange}/>
                    <span>Psychic</span>
                </label>
                    
            </div>
            <div>
                <label htmlFor="ice">
                <input id="ice" type="checkbox" className="check" onChange={handleChange}/>
                <span>Ice</span>
                </label>
            </div>
            <div>
                <label htmlFor="dragon">
                <input id="dragon" type="checkbox" className="check" onChange={handleChange}/>
                    <span>Dragon</span>
                     </label>
            </div>
            <div>
                <label htmlFor="dark">
                    <input id="dark" type="checkbox" className="check" onChange={handleChange}/>
                    <span>Dark</span>
                </label>
            </div>
            <div>
                <label htmlFor="fairy">
                <input id="fairy" type="checkbox" className="check" onChange={handleChange}/>
                    <span>Fairy</span>
                </label>
            </div>
            <div>
                <label htmlFor="unknown">
                <input id="unknown" type="checkbox" className="check" onChange={handleChange}/>
                <span>Unknown</span>
                </label>
            </div>
            <div>
                <label htmlFor="shadow">
                    <input id="shadow" type="checkbox" className="check" onChange={handleChange}/>
                    <span>Shadow</span>
                </label>
            </div>
            </div>  
                <button >

                <label onClick={handleSubmit} htmlFor="btn-modal">Filtrar</label>
                </button>
            </div>
                
            
            </div>
            </div>
            </div>
            <div className={style.refresh}>
              <span>boton refresh</span>
            </div>
          </div>
           
            <div>
              <button onClick={filtradoBaseDatos}>Mostrar solo pokemons creados</button>
              <button>Mostrar solo pokemons existentes</button>
            </div>

            <div className={style.container}>
                {!initialPokemons?.length  && 
                <img src={imgLoading} alt="" height="60px" width="60px"/> }
{console.log(initialPokemons)}
               
                {initialPokemons.length > 0  && initialPokemons.map(pokemon => 
                <div className={style.card} key={pokemon.id}>
                  #{pokemon.id} {pokemon.nombre[0].toUpperCase() + pokemon.nombre.slice(1)} 
                  {pokemon.imagen? <div><Link to={`/home/pokemon/${pokemon.id}`}> <img src={pokemon.imagen} alt="" height="120px" width="120px"/></Link></div>
                  :<div> <Link to={`/home/pokemon/${pokemon.id}`}><img src={egg} alt="" height="120px" width="120px"/></Link></div>}
                  {pokemon.tipos.map(e => <li>{e}</li>)}
                  </div>)}
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

export default Home
