const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.




module.exports =  (sequelize) => {
  // defino el modelo
   sequelize.define('pokemon', {
    name: {
      type: DataTypes.STRING,
        allowNull: false,
    },
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    
    hp: {
      type: DataTypes.INTEGER,
    },
    attack:{
      type: DataTypes.INTEGER,
    },
    defense:{
      type: DataTypes.INTEGER,
    },
    speed:{
      type: DataTypes.INTEGER,
    },
    height:{
      type: DataTypes.DOUBLE,

    },
    weight:{
      type: DataTypes.DOUBLE,
    },
   
  });
};

// Page.beforeValidate((page)=>{
//   page.urlTitle = page.title && page.title.replace(/\s+/g, '_').replace(/\W/g, '')
// })
