const Product=require ('../models/product.model');

const getAllProductsService=async()=>{
   return Product.find({});
     //return Product('test')  
};

const createProductsService=async(payload)=>{
    const newProduct=new Product(payload);
    return await newProduct.save();

};


const getProductsByIdService=async (id)=>{
    return await Product.findById(id);
};

const deleteProductsService=async (id)=>{
    return await Product.findByIdAndDelete(id);
};


const editProductService= async(id, payload)=>{
    const options={
        new: true,
    }
    return await Product.findByIdAndUpdate(id, payload,options);

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
const getProductByCategorieService = async (categorie) => {
    return await Product.find({ categorie: categorie });

};

const getProductByDescriptionService= async (description) => {
    return await Product.find({ description: description });

};

const getProductBySpotlightService= async (spotlight) => {
    return await Product.find({ spotlight: spotlight });

};

module.exports={
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

};
