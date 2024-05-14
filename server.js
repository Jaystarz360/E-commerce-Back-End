// Set up requirements
const express = require('express');
const routes = require('./Develop/routes');

// Import sequelize connection
const sequelize = require('./Develop/config/connection');

// Set up express and PORT
const app = express();
const PORT = process.env.PORT || 3001;

//Middleware JSON and urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// App.use
app.use(routes);

// Sync sequelize models to the database, then turn on the server
sequelize.sync({force:false}).then(() =>{
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  }) 
  });
