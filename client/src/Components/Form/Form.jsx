import React, { useState } from 'react';

import Navbar from "../Navbar/navbar.jsx"
import "./Form.css"
import { useDispatch} from "react-redux"
import {createPokemon} from "../../Actions/actions.js"
import { useHistory} from "react-router-dom"

function Form() {
   
   
//    const prueba =() => {
//        const checks = document.querySelectorAll(".check")
//        checks.forEach(e => {
//            if(e.checked === true){
//                arr.push(e.id)
//             }
//       });
//}

    const dispatch = useDispatch()

    const [form, setForm] = useState({
        name: "",
        hp: "",
        attack: "",
        defense: "",
        speed: "",
        height: "",
        weight: "",
       

    })
   const handleChange = (e) => {
    setForm({
        ...form,
        [e.target.id]: e.target.value,
      

    })
   }

   const history = useHistory()

   const handleSubmit = (e) => {
    dispatch(createPokemon(form))
    e.preventDefault()
    history.push("/form/pokemoncreated")
   }
  
   
    
  
   
    
return (
    <div>
        <Navbar/>
        <form className="form" onSubmit={handleSubmit}>
            <h2>Crea tu propio pokemon!</h2>
            <div>
            
                <input id="name"  type="text" placeholder="Name..." autoComplete="off" onChange={handleChange}/>
            </div>
            <div>  
                <input id="hp"  type="number" placeholder="Hp..." onChange={handleChange}/>
            </div>
            <div>
                <input id="attack"  type="number" placeholder="Attack..."onChange={handleChange}/>
            </div>
            <div>
            <input id="defense"  type="number" placeholder="Defense..."onChange={handleChange}/>
            </div>
            <div>
                <input id="speed"  type="number" placeholder="Speed..."onChange={handleChange}/>
            </div>
            <div>
                <input id="height"  type="number" placeholder="Height..."onChange={handleChange}/>
            </div>
            <div>
                <input id="weight"  type="number" placeholder="Weight..."onChange={handleChange}/>
            </div>
            <hr />
            <p>Types</p>
            
        <div className="span">
        <div>
                <label htmlFor="normal">Normal</label>
                <input id="normal" type="checkbox" className="check"/>
        </div>
        <div>
                <label htmlFor="fighting">Fighting</label>
                <input id="fighting" type="checkbox" className="check"/>
            </div>
            <div>
                <label htmlFor="flying ">Flying </label>
                <input id="flying " type="checkbox" className="check"/>
            </div>
            <div>
                <label htmlFor="poison">Poison</label>
                <input id="poison" type="checkbox" />
            </div>
            <div>
                <label htmlFor="ground">Ground</label>
                <input id="ground" type="checkbox" />
            </div>
            <div>
                <label htmlFor="rock ">Rock </label>
                <input id="rock " type="checkbox" />
            </div>
            <div>
                <label htmlFor="bug">Bug</label>
                <input id="bug" type="checkbox" />
            </div>
            <div>
                <label htmlFor="ghost">Ghost</label>
                <input id="ghost" type="checkbox" />
            </div>
            <div>
                <label htmlFor="steel">Steel</label>
                <input id="steel" type="checkbox" />
            </div>
            <div>
                <label htmlFor="fire">Fire</label>
                <input id="fire" type="checkbox" />
            </div>
            <div>
                <label htmlFor="water">Water</label>
                <input id="water" type="checkbox" />
            </div>
            <div>
                <label htmlFor="grass">Grass</label>
                <input id="grass" type="checkbox" />
            </div>
            <div>
                <label htmlFor="electric">Electric</label>
                <input id="electric" type="checkbox" />
            </div>
            <div>
                <label htmlFor="psychic">Psychic</label>
                <input id="psychic" type="checkbox" />
            </div>
            <div>
                <label htmlFor="ice">Ice</label>
                <input id="ice" type="checkbox" />
            </div>
            <div>
                <label htmlFor="dragon ">Dragon </label>
                <input id="dragon " type="checkbox" />
            </div>
            <div>
                <label htmlFor="dark ">Dark </label>
                <input id="dark " type="checkbox" />
            </div>
            <div>
                <label htmlFor="fairy">Fairy</label>
                <input id="fairy" type="checkbox" />
            </div>
            <div>
                <label htmlFor="unknown">Unknown</label>
                <input id="unknown" type="checkbox" />
            </div>
            <div>
                <label htmlFor="shadow">Shadow</label>
                <input id="shadow" type="checkbox" />
            </div>
        </div>
        <br />
            <button onClick={handleSubmit}> submit </button>
        </form>
    </div>
)
}

export default Form
