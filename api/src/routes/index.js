const { Router } = require('express');
const axios = require('axios').default;
const { Pokemon, Tipo, type_pokemon } = require('../db.js');

const { conn } = require('../db.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
const {Op} = require("sequelize")

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);





router.get("/pokemons/", async (req,res,next)=>{
  
   if(req.originalUrl === "/pokemons"){
    try{
      const pokemonsFinded = await Pokemon.findAll({include:[Tipo]})
      let pokemonsDB = pokemonsFinded.map( e => {
         const types = e.dataValues.tipos.map(e => e.name)
         return {
            ...e.dataValues,
            tipos: types
         }
      })

      let offset= Math.floor(Math.random() * 212)
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=40`) 
      const pokemonUrl = response.data.results.map(e => e.url)
      const PromiseUrl = await Promise.all(pokemonUrl.map(e => axios.get(e)))

      const pokemon = PromiseUrl.map(e=> {
         let tipos = e.data.types.map(e => e.type.name)
         return {nombre: e.data.name,
            imagen:e.data.sprites.other['official-artwork'].front_default,
            tipos: tipos,
            id: e.data.id,
            ataque: e.data.stats[1].base_stat,
         }
      })
  
      return res.status(200).json([...pokemon, ...pokemonsDB])
    }
    catch(error){
      return res.status(404).send(error)
    }
   }
    else next()
    
 });


 
router.get("/pokemons/:id", async (req, res)=>{
   const {id} = req.params  
   try{
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      let altura = response.data.height.toString().split("")
      let peso = response.data.weight.toString().split("")
      altura.splice(-1,0,",")
      peso.splice(-1,0,",")

      const pokemon = {
         nombre: response.data.name,
         imagen: response.data.sprites.other['official-artwork'].front_default,
         tipos: response.data.types.map(e => e.type.name),
         id: response.data.id,
         hp: response.data.stats[0].base_stat,
         ataque: response.data.stats[1].base_stat,
         defensa: response.data.stats[2].base_stat,
         velocidad: response.data.stats[5].base_stat,
         altura: altura.join(""),
         peso: peso.join("")
      }
      return res.status(200).json(pokemon)
   }
   catch(error){
      if(error){
      Pokemon.findOne({
         where: {
            id: id
         },
         include:[Tipo]
      })
      .then(pokemon=> {
         
         if(pokemon){
            let obj = {...pokemon.dataValues,tipos: pokemon.tipos.map(e => e.name)}
            return res.status(200).json(obj)}
         else return res.status(404).send("El id no corresponde a un pokemon valido.")
      })
      .catch(() =>{
         res.status(400).send("Ingrese un numero valido para buscar un Pokemon")
      })
      }
      
   }
 });



 router.get("/pokemons", async (req,res)=>{
   const name = req.query.name.toLowerCase()
   try{
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
      let altura = response.data.height.toString().split("")
      let peso = response.data.weight.toString().split("")
      altura.splice(-1,0,",")
      peso.splice(-1,0,",")
      const pokemon = {
         nombre: response.data.name,
         imagen: response.data.sprites.other['official-artwork'].front_default,
         tipos: response.data.types.map(e => e.type.name),
         id: response.data.id,
         hp: response.data.stats[0].base_stat,
         ataque: response.data.stats[1].base_stat,
         defensa: response.data.stats[2].base_stat,
         velocidad: response.data.stats[5].base_stat,
         altura: altura.join(""),
         peso: peso.join("")
      }
         return res.json(pokemon)
   
   }
   catch(error){
         Pokemon.findOne({
            where: {
               nombre: name
            },
            include:[Tipo]
         })
         .then(pokemon => {
            if(pokemon){
               let obj = {...pokemon.dataValues,tipos: pokemon.tipos.map(e => e.name)}
               return res.json(obj)
            }
            else return res.status(404).send("El pokemon no existe")
         })
   }

});




router.post("/pokemons", async (req,res)=>{
   const pokemon = req.body
   const {nombre} = req.body

   try{

   
   let id = 899
   const allPokemon = await Pokemon.findAll()
   const pokemonCreated = await Pokemon.create({
      ...pokemon,
      nombre: nombre?.toLowerCase(),
      id: parseInt( id + allPokemon.length),
   })
      pokemon.tipos.forEach(async type =>  await pokemonCreated.addTipos(await Tipo.findOne({  
         where: {
            name: type,
            
         },
         
      })))

   var findTypes =  await Tipo.findAll({  
      where: {
         name: pokemon.tipos,
      }
   })
  

   
   return res.json({...pokemonCreated.dataValues, tipos: findTypes.map(e => e.dataValues.name)})
   // return res.json(pokemonCreated)
   }
   catch(error){
      res.send("hubo un error")
   }
})





router.get("/types", async (req, res)=> {
   const typesBD = await Tipo.findAll({include : Pokemon })

   res.json(typesBD.map(elemento => elemento.name))
})

//get para obtener pokemons por su tipo pero solo en base de datos

router.get("/types/:type", async (req, res)=> {
   const typodepokemones = req.params.type
      const typesBD = await Tipo.findOne({where: { name :typodepokemones }, include:[Pokemon]})
      res.json(typesBD)
   })

   router.get("/presentation", async(req, res)=>{
      let offset= Math.floor(Math.random() * 222)
      try{const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=30`) 
      const pokemonUrl = response.data.results.map(e => e.url)
      const PromiseUrl = await Promise.all(pokemonUrl.map(e => axios.get(e)))

      const pokemon =  PromiseUrl.map(e=> {
         let tipos = e.data.types.map(e => e.type.name)
         
         return {nombre: e.data.name,
            imagen:e.data.sprites.other['official-artwork'].front_default,
            id: e.data.id,
            tipos: tipos,
         }
      })
      // const pokemonsRandoms= pokemon.sort((obj1, obj2) => {
      //    if(obj1.nombre < obj2.nombre){
      //       return -1
      //    } else if (obj1 > obj2){
      //       return 1;
      //    } else {
      //       return 0
      //    }
      // })
      return res.json(pokemon)
   }
      catch(err){
         console.error(err)
      }
   })

module.exports = router;

