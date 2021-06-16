import axios from 'axios';


export const GET_INITIAL_POKEMONS = "GET_INITIAL_POKEMONS";
export const GET_POKEMON = "GET_POKEMON"
export const LOADING = "LOADING";
export const GET_TYPE = "GET_TYPE";
export const CREATE_POKEMON = "CREATE_POKEMON";


export const getInitialPokemons = () => {
    return  (dispatch) =>{
        
        axios.get("http://localhost:3001/pokemons").then(resp => {
            dispatch({type: GET_INITIAL_POKEMONS, payload: resp.data})
        })
        .catch(() => {
            console.log("Ups! Algo malió sal")
        })
    }
}

export const getPokemon = (name) => {
    return  (dispatch) =>{
        dispatch({type:LOADING})
        axios.get(`http://localhost:3001/pokemons?name=${name}`)
        .then(response => {
                dispatch({type: GET_POKEMON, payload: response.data})
        })
        .catch(error => {
            if(error.response?.status !== 404) alert("algo salio mal")
            dispatch({type: GET_POKEMON, payload: null})
        })
    }
}

export const createPokemon = (data) => {
    return  (dispatch) =>{
        
        axios.post("http://localhost:3001/pokemons", data).then(resp => {
            
            dispatch({type: CREATE_POKEMON, payload: resp})
            console.log(resp)
        })
        .catch(() => {
            console.log("Ups! Algo malió sal")
        })
    }
}
export const actionLoading = () => {
    return(dispatch) => {
        dispatch({type:LOADING})

    }
}