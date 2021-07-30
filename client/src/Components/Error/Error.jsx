import React from 'react'
import error from "../../Img/psyduck.png"
import style from "./Error.module.css"

function Error() {
    return (
        <div className={style.error}>
            <h1>Ups!</h1>
            <h2>Error 404</h2>
            <div>
            <img src={error} alt="" width="200px" height="200px"/>
            <h2>Page not found</h2>

            </div>
        </div>
    )
}

export default Error
