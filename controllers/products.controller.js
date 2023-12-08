//const{ getAllProductsService}=require('../services/products.service');

const {
  getAllProductsService,
  createProductsService,
  getProductsByIdService,
  deleteProductsService,
  editProductService,
  getProductByTittleService,
  getProductByPriceService,
  getProductByOfferpriceService,
  getProductByCategorieService,
  getProductBySpotlightService,

} = require("../services/products.service");

const getAllProducts = async (req, res) => {
  try {
    const response = await getAllProductsService(); //para obtener todos los productos

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await getProductsByIdService(id); //para obtener todos los productos x id

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const editProductById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const payload = req.body; // lo que manda el front, aqui la guardo en el payload, req. body
    const response = await editProductService(id, payload);
    if (response == null) return res.status(404).json("usuario no registrado");
    res.status(200).json(response); //aqui payload recarda lo enviado
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const deleteProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await deleteProductsService(id); //para obtener todos los productos x id

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const createProducts = async (req, res) => {
  try {
    const payload = req.body;
    const response = await createProductsService(payload);

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// seccion para instancias los model shema de los productos-Tittle

const getProductByTittle = async (req, res) => {
  try {
    const { tittle } = req.params;
    const response = await getProductByTittleService(tittle); //para obtener todos los productos x tittle
    if (!response) return res.status(404).json("producto inexistente");

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// seccion para instancias los model shema de los productos-Price
const getProductByPrice = async (req, res) => {
    try {
      const { price } = req.params;
      const response = await getProductByPriceService(price); //para obtener todos los productos x price
      console.log(response);
      if (response.length==0) return res.status(404).json("precio inexistente");
  
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json(error.message);
    }
  };


  // seccion para instancias los model shema de los productos-offerPrice
const getProductByOfferprice = async (req, res) => {
    try {
      const { offerprice } = req.params;
      const response = await getProductByOfferpriceService(offerprice); //para obtener todos los productos x offerprice
      if (response.length==0) return res.status(404).json("precio de oferta inexistente");
  
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json(error.message);
    }
  };

  // seccion para instancias los model shema de los productos-categorie
const getProductByCategorie = async (req, res) => {
    try {
      const { categorie } = req.params;
      const response = await getProductByCategorieService(categorie); //para obtener todos los productos x categorie
      if (response.length==0) return res.status(404).json("categoria inexistente");
  
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json(error.message);
    }
  };

  // seccion para instancias los model shema de los productos-description
const getProductBySpotlight = async (req, res) => {
    try {
      const { spotlight } = req.params;
      const response = await getProductBySpotlightService(spotlight); //para obtener todos los productos x categorie
      if (!response) return res.status(404).json("descripcion inexistente");
  
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json(error.message);
    }
  };


module.exports = {
  getAllProducts,
  createProducts,
  getProductById,
  deleteProductById,
  editProductById,
  getProductByTittle,
  getProductByPrice,
  getProductByOfferprice,
  getProductByCategorie,
  getProductBySpotlight,
};
