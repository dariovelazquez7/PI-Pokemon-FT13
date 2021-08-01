import React, { useEffect, useState } from 'react'
import {Link} from "react-router-dom"
// import style from "./presentation.module.css"
import style from "./presentation.module.css"
import { useDispatch} from "react-redux";
import {getInitialPokemons, pokemonsPresentation} from "../../Actions/actions"

import pokebola from "../../Img/pokebola.png"
import { useSelector } from "react-redux";
import imgLoading from "../../Img/loading.gif";
import columnaPokemon from "../../Img/columnpk.png"
import github from  "../../Img/github.png"
import gmail from  "../../Img/gmail.png"
import linkedin from  "../../Img/linkedin.png"


function Presentation() {
    const dispatch = useDispatch()
    const [state, setState] = useState(undefined)
    const [toggle, setToggle] = useState({})
    const pokemonPresentation = useSelector(state => state.pokemonPresentation)
    const loading = useSelector(state => state.loading)
    
    const action = () => {
        const randomPokemons = pokemonPresentation.sort((obj1, obj2) => {
            if(obj1.nombre < obj2.nombre){
                return -1
            } else if (obj1 > obj2){
                return 1;
            } else {
                return 0
            }
        })  
        setState(randomPokemons.slice(0,4))
          
    }

    // useEffect(() => {
    //     dispatch(pokemonsPresentation())
    //     action()
    // }, [])
   
const handleChange = (e) => {
    setToggle({...toggle, [e.target.id]: e.target.checked})
    
}
// let arrayPokemons = []
console.log(state)
    return (
        <div className={style.bodyPage}>
            
            <div className={style.container}>
                <div className={style.title}>Bienvenidos a pokeApp!</div>
                
                {loading? <img className={style.loading}  src={imgLoading} alt="" height="60px" width="60px"/>:
                state?.map(pokemon => {
                    
                    // if(toggle[pokemon.nombre] === true){
                    //     arrayPokemons.push(pokemon)
                    // }
                     return(
                        
                        <div className={style.divContain}>

                        <label htmlFor={pokemon.nombre}>
                        <input  id={pokemon.nombre} type="checkbox" style={{display: "none"}} onChange={handleChange}/>
                        <span >
                        <img className={pokemon.tipos[0] === "bug"? style.bug1 : pokemon.tipos[0]  === "fire"? 
                        style.fire1: pokemon.tipos[0]  === "shadow"? style.shadow1:pokemon.tipos[0]  === "dragon"? style.dragon1:
                        pokemon.tipos[0]  === "electric"? style.electric1: pokemon.tipos[0]  === "fairy"? style.fairy1:
                        pokemon.tipos[0]  === "fighting"? style.fighting1: pokemon.tipos[0]  === "fire"? style.fire1: 
                        pokemon.tipos[0]  === "flying"? style.flying1:pokemon.tipos[0]  === "ghost"? style.ghost1: pokemon.tipos[0]  === "grass"? 
                        style.grass1: pokemon.tipos[0]  === "ground"? style.ground1:pokemon.tipos[0]  === "ice"? style.ice1: 
                        pokemon.tipos[0]  === "poison"? style.poison1: pokemon.tipos[0]  === "psychic"? 
                        style.psychic1: pokemon.tipos[0]  === "rock"? style.rock1:pokemon.tipos[0]  === "steel"? style.steel1: 
                        pokemon.tipos[0]  === "water"? style.water1: pokemon.tipos[0] === "dark"? style.dark1: pokemon.tipos[0]  ==="unknown"? 
                        style.unknown1:pokemon.tipos[0] === "normal"? style.normal1: false}  id={pokemon.nombre} src={toggle[pokemon.nombre]? 
                        pokemon.imagen:pokebola } alt={pokemon.nombre}/>
                        </span>
                        </label>
                       
                        </div>
                    )}
                )}
                {/* {!loading && state.length === 0 && <img src={pokebola} alt="nocarga" height="60px" width="60px"/> } */}
                    {/* <div className={style.score}>
                      <div>Capturados:</div>
                      <div >{arrayPokemons.length}</div>
                    </div> */}
                </div>
                <div className={style.containerInfo}>
                    <div>
                        <img src={columnaPokemon} alt="" height="700px" width="400px" />
                    </div>
                    <div className={style.informacionPage}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam ex laborum, dolorum nisi earum aliquam quam. Dolorem commodi beatae quibusdam perferendis soluta harum dolorum rem. Corporis perspiciatis velit ipsa porro!
                    <div>
                    <Link to={"/home"}> 
                        <button className={style.btn} onClick={()=> dispatch(getInitialPokemons())}>Start</button>
                    </Link>
                    </div>
                    </div>
                    
                </div>
            

            <div className={style.footer}> 
                <div className={style.personalInfo}>
                    <div style={{color: "white"}}>Darío Velázquez</div>
                    <div style={{color: "gray", fontSize: "13px"}}>Full Stack Developer - 2021</div>                
                </div>
                <div className={style.logos}>
                    <a href="https://github.com/dariovelazquez7" rel="noreferrer" target="_blank">
                    <img src={github} alt="" height="40px" width="40px"/>
                    </a>
                    <a href="https://www.linkedin.com/in/dariio-velazquez/" rel="noreferrer" target="_blank"> 
                    <img src={linkedin} alt="" height="40px" width="40px"/>
                    </a>
                    <a href="mailto:dario.velazquez10@gmail.com" rel="noreferrer" target="_blank">
                    <img src={gmail} alt="" height="40px" width="40px" />
                         </a>
                    
                </div>
            </div>
         
        </div>
    )
}

export default Presentation;