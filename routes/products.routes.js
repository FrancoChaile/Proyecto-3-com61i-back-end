const { Router } = require('express');
const { getAllProducts, createProducts, getProductById, deleteProductById, editProductById } = require('../controllers/products.controller');
const { getById } = require('../controllers/users.controllers');
const { getProductByTittle, getProductByPrice, getProductByOfferprice, getProductByCategorie, getProductBySpotlight }= require('../controllers/products.controller');

const route=Router();
route.get('/', getAllProducts);
route. get('/getById/:id', getProductById);
route.post('/create', createProducts);
route. delete('/delete/:id', deleteProductById);
route.patch("/edit/:id", editProductById); 

// creo rutas para mi shema model
route.get('/gettittle/:tittle', getProductByTittle);
route.get('/getprice/:price', getProductByPrice);//offerPrice
route.get('/getofferprice/:offerprice', getProductByOfferprice);
route.get('/getcategorie/:categorie', getProductByCategorie);
route.get('/getspotlight/:spotlight', getProductBySpotlight);




module.exports= route;