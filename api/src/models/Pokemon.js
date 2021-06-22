const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.




module.exports =  (sequelize) => {
  // defino el modelo
   sequelize.define('pokemon', {
    nombre: {
      type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    
    hp: {
      type: DataTypes.INTEGER,
    },
    ataque:{
      type: DataTypes.INTEGER,
    },
    defensa:{
      type: DataTypes.INTEGER,
    },
    velocidad:{
      type: DataTypes.INTEGER,
    },
    altura:{
      type: DataTypes.DOUBLE,

    },
    peso:{
      type: DataTypes.DOUBLE,
    },
   
  });
};


