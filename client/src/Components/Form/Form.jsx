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
        tipos: [],
     
    })

    const [error, setError] = useState("")



    const Allchecked =() => {
        const checks = document.querySelectorAll(".check")
        checks.forEach(e => {
            let aux = []
            aux.push(e.checked)
            if(e.checked === true ){
                    arr.push(e.id)
                    if(arr.length === 3){
                        e.checked = false
                    }
             }
       });
    }
   
   const handleChange = (e) => {
        if(!/(?=.*[0-9])/.test(e.target.value)){
            setError("El campo debe ser un numero")
        } else
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
            
                <input name="nombre" maxlength="10" type="text" placeholder="Nombre..." autoComplete="off" onChange={handleChange}/>
            </div>
            <div>  
                <input name="hp"  maxlength="3"  max="250" type="text" placeholder="Hp..." onChange={handleChange}/>
            </div>
            <div>
                <input name="ataque"  maxlength="3" max="250" type="text" placeholder="Ataque..."onChange={handleChange}/>
            </div>
            <div>
            <input name="defensa"  maxlength="3" max="250" type="text" placeholder="Defensa..."onChange={handleChange}/>
            </div>
            <div>
                <input name="velocidad" maxlength="3" max="500" type="text" placeholder="Velocidad..."onChange={handleChange}/>
            </div>
            <div>
                <input name="altura" maxlength="3" max="15" type="text" placeholder="Altura..."onChange={handleChange}/>
            </div>
            <div>
                <input name="peso" maxlength="3" max="300" type="text" placeholder="Peso..."onChange={handleChange}/>
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
