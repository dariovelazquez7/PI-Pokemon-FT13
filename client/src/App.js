import './App.css';
import {Route, Switch } from "react-router-dom";
import Home from "./Components/Home/home.jsx";
import Presentation from "./Components/Presentation/Presentation.jsx"
import Navbar from "./Components/Navbar/navbar.jsx"
import SearchPokemon from './Components/SearchPokemon/SearchPokemon.jsx';
import Error from "./Components/Error/Error.jsx"
import Form from "./Components/Form/Form.jsx";
import PokemonCreated from './Components/PokemonCreated/PokemonCreated';
import Details from './Components/Details/Details';
import ModalFilterTypes from "./Components/ModalFilterTypes/ModalFilterTypes.jsx";
// import Types from './Components/Types/Types';

function App() {
  return (
    <div className="App">
      
      <Route path="/home" component={Navbar}/>
    <Switch>
      <Route exact path="/" component={Presentation}/>
      <Route exact path="/home" component={Home}/>
      <Route exact path="/home/pokemon" component={SearchPokemon}/>
      <Route exact path="/form" component={Form}/>
      <Route exact path="/form/pokemoncreated" component={PokemonCreated}/>
      <Route exact path="/home/pokemon/:id" component={Details}/>
      <Route exact path="/tipos" component={ModalFilterTypes}/>

      <Route path = "*" component={Error}/>
    </Switch>

      
    </div>
  );
}

export default App;
