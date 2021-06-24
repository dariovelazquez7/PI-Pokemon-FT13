import React, { useState } from 'react';

import Navbar from "../Navbar/navbar.jsx"
import "./Form.css"
import { useDispatch,useSelector} from "react-redux"
import {createPokemon} from "../../Actions/actions.js"
import { useHistory} from "react-router-dom"
import Types from '../Types/Types.jsx';




function Form() {
   
    const pokemonCreated = useSelector(state => state.pokemonCreated)
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
    
    const [errors, setErrors] = useState("")
    
    let arr = []
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

    let regex = /^([0-9])*$/

         function validate() {
        let errors = {
        }
         if (!regex.test(form.hp)) {
          errors.hp = 'debe ser un numero';
        }
         if (!regex.test(form.ataque)) {
            errors.ataque = 'debe ser un numero';
          }
          if (!regex.test(form.defensa)) {
            errors.defensa = 'debe ser un numero';
          }
           if (!regex.test(form.velocidad)) {
            errors.velocidad = 'debe ser un numero';
          }
           if (!regex.test(form.altura)) {
            errors.altura = 'debe ser un numero';
          }
          
           if (!regex.test(form.peso)) {
            errors.peso = 'debe ser un numero';
          }
        return errors;
      };

   const handleChange = (e) => {
        setErrors(validate(setForm({
            ...form,
            [e.target.name]: e.target.value,
            tipos: arr
           
        })))

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
    history.push(`/form/pokemoncreated`)
    }
      
    const buttonActive = (e) => {
        if(form.peso === ""){
            document.getElementById("btn_submit").disabled= true   
        }
        else 
        document.getElementById("btn_submit").disabled= false
    }
   
console.log("creado:",pokemonCreated)
return (
    <div>
        <Navbar/>
        <form className="form" onSubmit={handleSubmit}>
            <h2>Crea tu propio pokemon!</h2>
            <div>
            
                <input className="campo_valido" name="nombre" maxLength="10" type="text" placeholder="Nombre..." autoComplete="off" onChange={handleChange}/>
            </div>
            <div> 
                
            <input className={errors.hp? "campo_invalido": "campo_valido"} name="hp" id="hp" maxLength="3" autoComplete="off" type="text" placeholder="Hp..." onChange={handleChange}/>
            </div>
           
            <div>
                <input className={errors.ataque? "campo_invalido": "campo_valido"} name="ataque"  maxLength="3" autoComplete="off" type="text" placeholder="Ataque..."onChange={handleChange}/>
            </div>
            <div>
            <input  className={errors.defensa? "campo_invalido": "campo_valido"}name="defensa" maxLength="3" autoComplete="off" type="text" placeholder="Defensa..."onChange={handleChange}/>
            </div>
            <div>
                <input className={errors.velocidad? "campo_invalido": "campo_valido"} name="velocidad"  maxLength="3" autoComplete="off" type="text" placeholder="Velocidad..."onChange={handleChange}/>
            </div>
            <div>
                <input  className={errors.altura? "campo_invalido": "campo_valido"} name="altura"  maxLength="3"autoComplete="off" type="text" placeholder="Altura..."onChange={handleChange}/>
            </div>
            <div>
                <input  className={errors.peso? "campo_invalido": "campo_valido"} name="peso" maxLength="3" autoComplete="off" type="text" placeholder="Peso..."onChange={handleChange}/>
            </div>
            <hr />
            <p>Types</p>
            <span onChange={handleChange}>
            <Types />

            </span>
           

            <button disabled className={form.peso === ""? "btn_desactive": "btn_active"} 
                id="btn_submit" onClick={handleSubmit}> Crear 
            </button>

        </form>
    </div>
)
}

export default Form
