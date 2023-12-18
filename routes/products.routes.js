
const { Router } = require("express");
const {
  getAllProducts,
  createProduct,
  getProductById,
  deleteProductById,
  editProductById,
  uploadIco,
  uploadImage
} = require("../controllers/products.controller");
const { getById } = require("../controllers/users.controllers");
const {
  getProductByTittle,
  getProductByPrice,
  getProductByOfferprice,
  getProductByCategorie,
  getProductBySpotlight,
} = require("../controllers/products.controller");

const { validateRole, validatorToken } = require("../middlewares/auth");

const multer = require('multer')
const upload = multer({dest: "uploads/"})

const route = Router();
route.get("/"
, validatorToken
, validateRole
, getAllProducts
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

route.patch("/edit/:id"
, validatorToken
, validateRole
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
, getProductByCategorie
);

route.get("/getspotlight/:spotlight"
, validatorToken
, validateRole
, getProductBySpotlight
);

module.exports = route;
