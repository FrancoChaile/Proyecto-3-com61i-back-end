const express = require('express');
const app = express();

// librerias 1 a cargas-ahora puedo usar las variables d entorno
require('dotenv').config();
require('../dbconnection/dbConnnection'); // conexion con base de datos mongoose


const port=process.env.PORT ||3000 //varialbe del puerto, 

// middleware 2 paso (esto es para la comunicacion etre front y back)
const morgan=require('morgan');
const cors = require('cors'); //recurso de origen cruzado

// utilizacion de los middleware  3paso
app.use(morgan ("dev"));
app.use(cors ());
app.use(express.json());

//routes-importo la ruta
const userRoutes=require('../routes/user.routes');
const productsRoutes=require ('../routes/products.routes');
const login=require('../routes/login.routes.js');

//useRoutes. usar estas rutas-utilizar estas rutas
app.use('/api/users',  userRoutes);
app.use( '/api/products', productsRoutes);
app.use('/api/login', login);


app.listen(port,()=>{  // iniciar el puerto
    console.log(`escuchando el puerto ${port}`);// es para ver que el puerto esta escuchando
});
