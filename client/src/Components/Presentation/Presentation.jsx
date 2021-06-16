import React from 'react'
import {Link} from "react-router-dom"
import style from "./presentation.module.css"
import btn from "../../Img/pokebtn.png"

function Presentation() {

    return (
        <div>
            <div className={style.home}>
                <h1>Inserte presentacion</h1>
                <Link to={"/home"}> <img src={btn} alt="" /></Link>
                
            </div>
        </div>
    )
}

export default Presentation;