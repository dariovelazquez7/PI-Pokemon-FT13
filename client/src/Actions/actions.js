import axios from 'axios';


export const GET_INITIAL_POKEMONS = "GET_INITIAL_POKEMONS";
export const GET_POKEMON = "GET_POKEMON"
export const LOADING = "LOADING";
export const GET_POKEMON_DETAIL = "GET_POKEMON_DETAIL";
export const CREATE_POKEMON = "CREATE_POKEMON";
export const GET_TYPES= "GET_TYPES";





export const getInitialPokemons = () => {
    return  (dispatch) =>{
        dispatch({type:LOADING})
        axios.get("http://localhost:3001/pokemons").then(resp => {
            dispatch({type: GET_INITIAL_POKEMONS, payload: resp.data})
        })
        .catch((error) => {
            if(error.response?.status !== 404) console.log("algo salio mal en 'getInitialPokemons'")
            dispatch({type: GET_INITIAL_POKEMONS, payload: null})
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
            if(error.response?.status !== 404) console.log("algo salio mal en 'getPokemon'")
            dispatch({type: GET_POKEMON, payload: null})
        })
    }
}

export const pokemonDetail = (id) => {
    return  (dispatch) =>{
        dispatch({type:LOADING})
        axios.get(`http://localhost:3001/pokemons/${id}`)
        .then(response => {
                dispatch({type: GET_POKEMON_DETAIL, payload: response.data})
        })
        .catch(error => {
            if(error.response?.status !== 404) console.log("algo salio mal en 'pokemonDetail'")
            dispatch({type: GET_POKEMON_DETAIL, payload: null})
        })
    }
}


export const createPokemon = (data) => {
    return  (dispatch) =>{
            axios.post("http://localhost:3001/pokemons", data).then(resp => {        
            dispatch({type: CREATE_POKEMON, payload: resp.data})
        })
        .catch(() => {
            console.log("Ups! Algo malió sal en 'createPokemon'")
        })
    }
}
export const getTypes = () => {
    return (dispatch)=>{
        axios.get("http://localhost:3001/types").then(respuesta => {
            dispatch({type: GET_TYPES, payload: respuesta.data})
        })
        .catch(() => {
            console.log("Ups! Algo malió sal en 'getTypes'")
        })
    }
}
