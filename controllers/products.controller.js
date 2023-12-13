//const{ getAllProductsService}=require('../services/products.service');

const {
  getAllProductsService,
  createProductService,
  getProductsByIdService,
  deleteProductsService,
  editProductService,
  getProductByTittleService,
  getProductByPriceService,
  getProductByOfferpriceService,
  getProductByCategoryService,
  getProductBySpotlightService,
  getActiveProductsService,
  getDisabledProductsService,

} = require("../services/products.service");
const cloudinary = require("cloudinary").v2;

const fs = require('fs-extra')

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

const createProduct = async (req, res) => {
  try {
    const payload = req.body;
    const response = await createProductService(payload);

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const uploadIco = async (req, res) => {

  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "products"
    });
    await fs.remove(req.file.path)
    return res.json(result)
  } catch (error) {
    console.error(error);
    return res.status(500).json({error: "Error al cargar el ícono"})
  }
}

const uploadImage = async (req, res) => {
  try {
    const promises = req.files.map((file) =>
      cloudinary.uploader.upload(file.path, { folder: "products" })
    );
    const results = await Promise.all(promises);
    // await fs.remove(req.files.path);
    return res.json(results);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al cargar imágenes" });
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
const getProductByCategory = async (req, res) => {
    try {
      const { categorie } = req.params;
      const response = await getProductByCategoryService(categorie); //para obtener todos los productos x categorie
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

  const getActiveProducts = async (req, res) => {
    try {
      const resp = await getActiveProductsService();
      res.status(200).json(resp);
    } catch (error) {
      res.status(500).json(error.message);
    }
  };
  
  const getDisabledProducts = async (req, res) => {
    try {
      const resp = await getDisabledProductsService();
      res.status(200).json(resp);
    } catch (error) {
      res.status(500).json(error.message);
    }
  };

  const prodOfferPrice = async (req, res) => {
    try {
      const { id } = req.params;
      const { offerPrice } = req.body;
      const newOfferPrice = offerPrice
      const resp = await editProductService(id, newOfferPrice);
      if (!resp) {
        res.status(404).json('ID de producto inexistente');
        return
      }
      res.status(200).json(resp);
      console.log(newOfferPrice);
    } catch (error) {
      res.status(500).json(error.message)
    }
  };
  
  const editProdPrice = async (req, res) => {
    try {
      const { id } = req.params;
      const { price } = req.body;
      const resp = await editProductService(id, { price });
      if (!resp) {
        res.status(404).json("ID de producto inexistente");
        return;
      }
      res.status(200).json(resp);
      console.log(price);
    } catch (error) {
      res.status(500).json(error.message);
    }
  };

  const disableProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const disabledTrue = { disabled: true };
      const resp = await editProductService(id, disabledTrue);
      if (!resp) {
        res.status(404).json("ID de producto inexistente");
        return;
      }
      res.status(200).json(resp);
    } catch (error) {
      res.status(500).json(error.message);
    }
  };
  
  const ableProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const disabledFalse = { disabled: false };
      const resp = await editProductService(id, disabledFalse);
      if (!resp) {
        res.status(404).json("ID de producto inexistente");
        return;
      }
      res.status(200).json(resp);
    } catch (error) {
      res.status(500).json(error.message);
    }
  };
  
  const offerProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const offerTrue = { offer: true };
      const resp = await editProductService(id, offerTrue);
      if (!resp) {
        res.status(404).json("ID de producto inexistente");
        return;
      }
      res.status(200).json(resp);
    } catch (error) {
      res.status(500).json(error.message);
    }
  };
  
  const spotlightProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const spotlightTrue = { spotlight: true };
      const resp = await editProductService(id, spotlightTrue);
      if (!resp) {
        res.status(404).json("ID de producto inexistente");
        return;
      }
      res.status(200).json(resp);
    } catch (error) {
      res.status(500).json(error.message);
    }
  };
  
  const unSpotlightProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const spotlightFalse = { spotlight: false };
      const resp = await editProductService(id, spotlightFalse);
      if (!resp) {
        res.status(404).json("ID de producto inexistente");
        return;
      }
      res.status(200).json(resp);
    } catch (error) {
      res.status(500).json(error.message);
    }
  };
  
  const unOfferProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const unOffer = { offer: false };
      const resp = await editProductService(id, unOffer);
      if (!resp) {
        res.status(404).json("ID de producto inexistente");
        return;
      }
      res.status(200).json(resp);
    } catch (error) {
      res.status(500).json(error.message);
    }
  };

module.exports = {
  getAllProducts,
  createProduct,
  getProductById,
  deleteProductById,
  editProductById,
  getProductByTittle,
  getProductByPrice,
  getProductByOfferprice,
  getProductByCategory,
  getProductBySpotlight,
  uploadIco,
  uploadImage,
  getActiveProducts,
  getDisabledProducts,
  editProdPrice,
  prodOfferPrice,
  ableProduct,
  unOfferProduct,
  spotlightProduct,
  unSpotlightProduct,
  offerProduct,
  disableProduct
};
