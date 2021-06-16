const { Router } = require('express');
const axios = require('axios').default;
const { Pokemon, Tipo } = require('../db.js');

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
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=40`)
      const pokemonUrl = response.data.results.map(e => e.url)
      const PromiseUrl = await Promise.all(pokemonUrl.map(e => axios.get(e)))

      const pokemon = PromiseUrl.map(e=> {
         let tipos = e.data.types.map(e => e.type.name)
         return {nombre: e.data.name,
            imagen:e.data.sprites.other['official-artwork'].front_default,
            tipos: tipos,
            id: e.data.id
           
         }
      })
      return res.json(pokemon)
      
    }
    catch(error){
      return res.status(404).send("Algo falló")
    }
   }
    else next()
    
 });


 
router.get("/pokemons/:id", async (req, res)=>{
   const {id} = req.params  
   try{
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      
      const pokemon = {
         name: response.data.name,
         image: response.data.sprites.other['official-artwork'].front_default,
         type: response.data.types.map(e => e.type.name).join(", "),
         id: response.data.id,
         hp: response.data.stats[0].base_stat,
         attack: response.data.stats[1].base_stat,
         defense: response.data.stats[2].base_stat,
         speed: response.data.stats[5].base_stat,
         height:response.data.height,
         weight: response.data.weight
      }
      return res.json(pokemon)
   }
   catch(error){
      if(error){
      Pokemon.findByPk(id)
      .then(pokemon=> {
         if(pokemon) return res.json(pokemon)
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
      
      const pokemon = {
         name: response.data.name,
         image: response.data.sprites.other['official-artwork'].front_default,
         type: response.data.types.map(e => e.type.name),
         id: response.data.id,
         hp: response.data.stats[0].base_stat,
         attack: response.data.stats[1].base_stat,
         defense: response.data.stats[2].base_stat,
         speed: response.data.stats[5].base_stat,
         height:response.data.height,
         weight: response.data.weight
      }
         return res.json(pokemon)
   
   }
   catch(error){
         Pokemon.findOne({
            where: {
               
               name: name
             
            }
         })
         .then(pokemon => {
            if(pokemon) return res.json(pokemon)
            else return res.status(404).send("El pokemon no existe")
         })
   }

});



router.post("/pokemons", async (req,res)=>{
   const pokemon = req.body
   const {name} = req.body
   // if(!name || !hp || !attack || !defense || !speed || !height || !weight)
   // return res.status(422).json({error: "No se recibieron los parámetros necesarios para crear el Pokemon"})

   let id = 899
   const allPokemon = await Pokemon.findAll()
   
   const pokemonCreated = await Pokemon.create({
      ...pokemon,
      name: name.toLowerCase(),
      id: id + allPokemon.length
   })
   pokemon.type.forEach(async type => pokemonCreated.addTipo(await Tipo.findOne({  
      where: {
         name: type,
      }
   })))

   // res.json({...pokemonCreated.dataValues, type : pokemon.type})
   res.json(pokemonCreated)
})


router.get("/types", async (req, res)=> {
// const response = await axios.get("https://pokeapi.co/api/v2/type")
//   const promesas = await Promise.all(response.data.results.map(e => {
//    return Tipo.findOrCreate({
//       where: {name: e.name}  
//    })  
// }))
//    return res.json(promesas)

   const typesBD = await Tipo.findAll({includes : Pokemon })
   res.json(typesBD)
})


router.get("/types/:tipe", async (req, res)=> {
   const typodepokemones = req.params.tipe
      const typesBD = await Tipo.findOne({where: { name :typodepokemones }, include:[Pokemon]})
      res.json(typesBD)
   })
  


module.exports = router;

