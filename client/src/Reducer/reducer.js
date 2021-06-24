import {GET_INITIAL_POKEMONS, GET_POKEMON, LOADING, CREATE_POKEMON, GET_POKEMON_DETAIL} from "../Actions/actions"

const initialState = {
    totalPokemons: JSON.parse( localStorage.getItem("TotalPokemonLocal")),
    initialPokemons: JSON.parse( localStorage.getItem("allPokemonLocal")),
    pokemon: undefined,
    loading: false,
    details: undefined,
    pokemonCreated: {},
    checks: []

}

function rootReducer (state = initialState, action) {
    switch (action.type) {
        case GET_INITIAL_POKEMONS:
            
            return {
                ...state,
                loading: false,
                initialPokemons: action.payload,
                totalPokemons: action.payload,
            }
        
        case GET_POKEMON:
            return {
                ...state,
                loading: false,
                pokemon: action.payload
            }
        case GET_POKEMON_DETAIL:
            return {
                ...state,
                loading: false,
                details: action.payload
            }
        
        case LOADING:
            return {
                ...state,
                loading: true
            }
        case CREATE_POKEMON:
            return{
            ...state,
                pokemonCreated: action.payload
        }
        
        default: return state
    }
}

export default rootReducer;