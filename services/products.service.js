const Product=require ('../models/product.model');

const getAllProductsService=async()=>{
   return Product.find({});
     //return Product('test')  
};

const createProductService=async(payload)=>{
    const newProduct=new Product(payload);
    return await newProduct.save();

};


const getProductsByIdService=async (id)=>{
    return await Product.findById(id);
};

const deleteProductsService=async (id)=>{
    return await Product.findByIdAndDelete(id);
};


const editProductService = async (id, payload) => {
    return await Product.findByIdAndUpdate(id, payload);
  };

const getProductByTittleService = async (tittle) => {
    return await Product.find({ tittle: tittle });

};
const getProductByPriceService = async (price) => {
    return await Product.find({ price: price });

};

const getProductByOfferpriceService = async (offerprice) => {
    return await Product.find({ offerprice: offerprice });

};
const getProductByCategoryService = async (categorie) => {
    return await Product.find({ categorie: categorie });

};

const getProductByDescriptionService= async (description) => {
    return await Product.find({ description: description });

};

const getProductBySpotlightService= async (spotlight) => {
    return await Product.find({ spotlight: spotlight });

};

const getActiveProductsService = async () => {
    return await Product.find({ disabled: false });
  };

const getDisabledProductsService = async () => {
    return await Product.find({ disabled: true });
  };

module.exports={
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
    getDisabledProductsService

};
