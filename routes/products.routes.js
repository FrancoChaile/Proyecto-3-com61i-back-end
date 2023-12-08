const { Router } = require('express');
const { getAllProducts, createProduct, getProductById, deleteProductById, editProductById, uploadIco, uploadImage } = require('../controllers/products.controller');
const { getById } = require('../controllers/users.controllers');
const { getProductByTittle, getProductByPrice, getProductByOfferprice, getProductByCategorie, getProductBySpotlight }= require('../controllers/products.controller');

const multer = require('multer')
const upload = multer({dest: "uploads/"})

const route=Router();
route.get('/', getAllProducts);
route. get('/getById/:id', getProductById);
route.post('/create', createProduct);
route. delete('/delete/:id', deleteProductById);
route.patch("/edit/:id", editProductById); 
route.post("/upload-icon", upload.single("icon"), uploadIco);
route.post("/upload-img", upload.array("images"), uploadImage);

// creo rutas para mi shema model
route.get('/gettittle/:tittle', getProductByTittle);
route.get('/getprice/:price', getProductByPrice);//offerPrice
route.get('/getofferprice/:offerprice', getProductByOfferprice);
route.get('/getcategorie/:categorie', getProductByCategorie);
route.get('/getspotlight/:spotlight', getProductBySpotlight);




module.exports= route;