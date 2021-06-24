import React from 'react'
import {Link} from "react-router-dom"
// import style from "./presentation.module.css"
import style from "./presentation.module.css"
import { useDispatch} from "react-redux";
import {getInitialPokemons} from "../../Actions/actions";


function Presentation() {
    const dispatch = useDispatch()
    return (
        <div className={style.body}>
            <div>
        
                <Link to={"/home"}> 
                <button onClick={()=> dispatch(getInitialPokemons())}> Start</button>
                </Link>
            </div>

            
         
        </div>
    )
}

export default Presentation;