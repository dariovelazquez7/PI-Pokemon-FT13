import React,{useState} from 'react'
import "./Types.css"

function Types() {

    let arr = []

    const [state, setState] = useState(undefined)

    const Allchecked =() => {
        const checks = document.querySelectorAll(".check")
        checks.forEach(e => {
            if(e.checked === true){
                arr.push(e.id)
           
             }
       });
    }
   
   const handleChange = (e) => {
        setState(arr)   
       Allchecked() 
   }

 






    return (
        <div>
            <input type="button" id="btn_modal"/>
            <label htmlFor="btn_modal"></label>
            <div className="modal"> 
                <div className="container">

                </div>
            </div>





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
                <label htmlFor="flying ">
                    <input id="flying " type="checkbox" className="check" onChange={handleChange}/>
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
                <label htmlFor="rock ">
                    <input id="rock " type="checkbox" className="check" onChange={handleChange}/>
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
                <label htmlFor="dragon ">
                <input id="dragon " type="checkbox" className="check" onChange={handleChange}/>
                    <span>Dragon</span>
                     </label>
            </div>
            <div>
                <label htmlFor="dark ">
                    <input id="dark " type="checkbox" className="check" onChange={handleChange}/>
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
        <br />
        </div>
    )
}

export default Types
