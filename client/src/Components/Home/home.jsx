import React, { useState, useEffect } from "react";
import "./home.module.css"
import style from "./home.module.css";
import imgLoading from "../../Img/loading.gif";
import error from "../../Img/psyduck.png"
import egg from "../../Img/egg.png";
import wobbu from "../../Img/wobbu.png";
import { useSelector , useDispatch} from "react-redux";
import {getInitialPokemons} from "../../Actions/actions";
import {TiMediaRewind, TiMediaFastForward} from "react-icons/ti";
import { useHistory} from "react-router-dom";
import {BiRefresh} from "react-icons/bi";


function Home() {
const history = useHistory()
let allPokemons= useSelector(state => state.initialPokemons)
let totalPokemons= useSelector(state => state.totalPokemons)
const loading = useSelector(state => state.loading)
const dispatch = useDispatch()

  const [state, setState] = useState({
    prev: 0,
    next: 12,
    select: "Numeracion",
    check: [],
    filtroPorTipo: undefined,
    filtradoBaseDatos:  undefined,
    filtradoOriginales: undefined,
    aux: undefined,
  })

  const [existe, setExiste] = useState(true)

  useEffect(() => {
    setState({ prev: 0, next: 12})
    localStorage.setItem("TotalPokemonLocal", JSON.stringify(totalPokemons))
    
  }, [totalPokemons])


//filtrado//
let arrayCheckbox = []
const CheckboxTypes =() => {
  let checks = document.querySelectorAll(".check")
  checks.forEach(e => {
      if(e.checked === true){
        arrayCheckbox.push(e.id)
        if(arrayCheckbox.length > 1){
          e.checked =false
        }
      }
  });
}


function handleChange () { 
  CheckboxTypes()
  setState({...state,  check:arrayCheckbox})
}


function handleSubmit(){
  if(state.check?.length){
    var checktype = state?.check[0]
    var lista= totalPokemons.filter(pokemon => pokemon.tipos.includes(checktype))
    setState({...state, filtroPorTipo: lista})
    if(lista.length === 0){setExiste(false)}
    else setExiste(true)
  }
  else{ 
    setState({...state, filtroPorTipo: totalPokemons})
    setExiste(true)
  }
  
}

if(state.filtroPorTipo?.length > 0){
  allPokemons =  state.filtroPorTipo
}



function filtradoBaseDatos() {
   let baseDatos = totalPokemons.filter(pokemon => pokemon.id > 898)
  setState({...state, filtradoBaseDatos: baseDatos, aux: false, prev: 0, next: 12})
  }

function filtradoOriginales () {
  let originales = totalPokemons.filter(pokemon => pokemon.id < 898)
  setState({...state, filtradoOriginales: originales, aux: true, prev: 0, next: 12})
}


  if(state.filtradoBaseDatos?.length > 0 && state.aux === false){
    allPokemons= state.filtradoBaseDatos
  }
  if(state.filtradoOriginales?.length > 0 && state.aux === true){
    allPokemons= state.filtradoOriginales
  }
let initialPokemons = allPokemons?.slice(state.prev,state.next)

useEffect(() => {
  localStorage.setItem("allPokemonLocal", JSON.stringify(allPokemons))
  
},[initialPokemons, allPokemons])

  



  //orden
  if(state.select === "Numeracion"){
    allPokemons?.sort((a,b) => {
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

  const onDetailsPokemon = (pokemonId) => {
    history.push(`/home/pokemon/${pokemonId}`)
  }
  

if(!loading && !allPokemons){
  return (
    <div className={style.error}>
      <h1>Ups!</h1>
      <h2>Parece que algo malió sal</h2>
      <img src={error} alt="" width="200px" height="200px"/>
      <div>
      <button onClick={()=> dispatch(getInitialPokemons())}>Toque aqui</button>

      </div>
    </div>
  )
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
              <span>  
                <button onClick={()=> dispatch(getInitialPokemons())}>Obtén otros pokemons<BiRefresh fontSize="30px"/>
                </button> 
              
              </span>
            </div>
          </div>
           
            <div className={style.checkFiltro}>
              
              <button onClick={filtradoBaseDatos}>Solo pokemons creados</button>
              <button onClick={filtradoOriginales}>Solo pokemons existentes</button>
            </div>

                { loading &&
                <img className={style.loading}  src={imgLoading} alt="" height="60px" width="60px"/> }
            <div className={style.container}>

                { !loading && !existe && <div className={style.notFound}> 
                  <h1>No se encontraron pokemons con ese tipo</h1>
                  <img src={wobbu}  height="200px" width="150px" alt="" /> 
                  <h2>Intenta con otros</h2>
                  </div>}
             
              { !loading && existe && initialPokemons.length > 0  && initialPokemons.map(pokemon => 
              <div className={style.card} key={pokemon.id} onClick={() =>onDetailsPokemon(pokemon.id)}>
                #{pokemon.id} {pokemon.nombre[0].toUpperCase() + pokemon.nombre.slice(1)} 
                {pokemon.imagen? <div><img src={pokemon.imagen} alt="" height="120px" width="120px"/></div>
                :<div><img src={egg} alt="" height="120px" width="120px"/></div>}
                {pokemon.tipos.map((e,i) => 
                <li  key={i} className={e === "bug"? style.bug : e === "fire"? style.fire: e === "shadow"? style.shadow:
                e === "dragon"? style.dragon: e === "electric"? style.electric: e === "fairy"? style.fairy:
                e === "fighting"? style.fighting: e === "fire"? style.fire: e === "flying"? style.flying:
                e === "ghost"? style.ghost: e === "grass"? style.grass: e === "ground"? style.ground:
                e === "ice"? style.ice: e === "poison"? style.poison: e === "psychic"? style.psychic: e === "rock"? style.rock:
                e === "steel"? style.steel: e === "water"? style.water: e=== "dark"? style.dark: e ==="unknown"? style.unknown:
                e=== "normal"? style.normal: false
              }>{e}</li>)}
                  </div>)}
            </div>

            <div className={style.div_btn}>
              {!loading &&
                <button className={style.btn} onClick={handlePrev}> <TiMediaRewind size="1.5em" color="white"/></button> 
              }
              {!loading &&
                <button className={style.btn} onClick={handleNext}> <TiMediaFastForward size="1.5em" color="white"/> </button>
              }
            </div>
        </div>
    )
  
}

export default Home
