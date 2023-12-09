
const { Router } = require("express");
const {
  getAllProducts,
  createProduct,
  getProductById,
  deleteProductById,
  editProductById,
  uploadIco,
  uploadImage,
  spotlightProduct,
  unSpotlightProduct,
  offerProduct,
  unOfferProduct,
  disableProduct,
  ableProduct,
  prodOfferPrice,
  editProdPrice
} = require("../controllers/products.controller");
const { getById } = require("../controllers/users.controllers");
const {
  getProductByTittle,
  getProductByPrice,
  getProductByOfferprice,
  getProductByCategory,
  getProductBySpotlight,
} = require("../controllers/products.controller");

const { validateRole, validatorToken, jwtValidatorAdmin } = require("../middlewares/auth");

const multer = require('multer')
const upload = multer({dest: "uploads/"})

const route = Router();
route.get("/get-products",
  jwtValidatorAdmin,
  getAllProducts
);

route.get("/getById/:id"
, validatorToken
, validateRole
, getProductById
);

route.post("/create"
, validatorToken
, validateRole
, createProduct
);

route.delete("/delete/:id"
, validatorToken
, validateRole
, deleteProductById
);

route.patch("/edit-product/:id"
, jwtValidatorAdmin
, editProductById
);

route.post("/upload-icon", upload.single("icon"), uploadIco);
route.post("/upload-img", upload.array("images"), uploadImage);


// creo rutas para mi shema model

route.get(
  "/gettittle/:tittle",
  validatorToken,
  validateRole,
  getProductByTittle
);

route.get("/getprice/:price"
    , validatorToken
    , validateRole
    , getProductByPrice
); //offerPrice

route.get("/getofferprice/:offerprice"
, validatorToken
, validateRole
, getProductByOfferprice
);

route.get("/getcategorie/:categorie"
, validatorToken
, validateRole
, getProductByCategory
);

route.get("/getspotlight/:spotlight"
, validatorToken
, validateRole
, getProductBySpotlight
);


route.patch("/spotlight-product/:id", 
jwtValidatorAdmin, 
spotlightProduct);

route.patch("/unspotlight-product/:id", 
jwtValidatorAdmin, 
unSpotlightProduct);

route.patch("/offer-product/:id", 
jwtValidatorAdmin,
offerProduct);

route.patch("/unoffer-product/:id", 
jwtValidatorAdmin, 
unOfferProduct);

route.patch("/disable-product/:id", 
jwtValidatorAdmin,
disableProduct);

route.patch("/able-product/:id", 
jwtValidatorAdmin,
ableProduct);

route.patch("/set-offer-price/:id", 
jwtValidatorAdmin, 
prodOfferPrice);

route.patch("/edit-price/:id", 
jwtValidatorAdmin,
editProdPrice);

module.exports = route;
