import React, { useState } from 'react';

import Navbar from "../Navbar/navbar.jsx"
import "./Form.css"
import { useDispatch} from "react-redux"
import {createPokemon} from "../../Actions/actions.js"
import { useHistory} from "react-router-dom"
import Types from '../Types/Types.jsx';


function Form() {
   
    let arr = []

    const dispatch = useDispatch()

    const [form, setForm] = useState({
        nombre: "",
        hp: "",
        ataque: "",
        defensa: "",
        velocidad: "",
        altura: "",
        peso: "",
        tipos: []
       

    })

    const Allchecked =() => {
        const checks = document.querySelectorAll(".check")
        checks.forEach(e => {
            if(e.checked === true){
                arr.push(e.id)
           
             }
       });
    }
   
   const handleChange = (e) => {
       setForm({
        ...form,
        [e.target.name]: e.target.value,
        tipos: arr
       
    })
        buttonActive()
        Allchecked() 
   }

   const history = useHistory()




    const handleSubmit = (e) => {
    dispatch(createPokemon(form))
    e.preventDefault()
    history.push("/form/pokemoncreated")
    
    }
      
    const buttonActive = () => {
        if(form.nombre === ""){
            document.getElementById("btn_submit").disabled= true   
        }
        else 
        document.getElementById("btn_submit").disabled= false
    }
   
   
   
    
  
   
    
return (
    <div>
        <Navbar/>
        <form className="form" onSubmit={handleSubmit}>
            <h2>Crea tu propio pokemon!</h2>
            <div>
            
                <input name="nombre"  type="text" placeholder="Nombre..." autoComplete="off" onChange={handleChange}/>
            </div>
            <div>  
                <input name="hp"  type="number" placeholder="Hp..." onChange={handleChange}/>
            </div>
            <div>
                <input name="ataque"  type="number" placeholder="Ataque..."onChange={handleChange}/>
            </div>
            <div>
            <input name="defensa"  type="number" placeholder="Defensa..."onChange={handleChange}/>
            </div>
            <div>
                <input name="velocidad"  type="number" placeholder="Velocidad..."onChange={handleChange}/>
            </div>
            <div>
                <input name="altura"  type="number" placeholder="Altura..."onChange={handleChange}/>
            </div>
            <div>
                <input name="peso"  type="number" placeholder="Peso..."onChange={handleChange}/>
            </div>
            <hr />
            <p>Types</p>
            <span onChange={handleChange}>
            <Types />

            </span>
            <br />
            <button disabled className={form.nombre === ""? "btn_desactive": "btn_active"} 
                id="btn_submit" onClick={handleSubmit}> Crear </button>

            
        </form>
    </div>
)
}

export default Form
