const{getUsersService, getByIdService, createUserService, editUserService, deleteUserService}=require('../services/users.services');
const { validationResult, Result}=require ('express-validator');
const User = require('../models/user.model');
//const { use } = require('../routes/user.routes');

const bcrypt= require ('bcrypt');// requiero la libreria de bcrypt
const { hasinPassword } = require('../helpers/passwordhasing');


// peticion de usuario
const getAllUsers = async(req, res) => {
    try {
        const response=await getUsersService();//para obtener todos los usuarios
        //res.status(200).json('test');
        if(response.length==0) return res.status(404).json('no hay ususarios registrados');
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json(error.message);
    }
};

// peticion de crear un usuario
const createUser = async(req, res) => {
    try {
        const errors=validationResult(req);

if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()});
}


       const payload = req.body;// lo que manda el front, aqui la guardo en el payload, req. body
       
       //comienzo de bcrypt rutina
       const userWithPassHash= await hasinPassword(payload);


        const response=await createUserService(payload);
        //res.status(200).json('se creado un usuario...');//aqui sale el mensaje recarda lo enviado
        res.status(201).json('usuario creado con exito');//aqui payload recarda lo enviado
    } catch (error) {
       res.status(500).json(error.message);
    }
};
const editUser=async (req, res)=>{
    try {
        const { id }= req.params;
       console.log(id)
        const payload = req.body;// lo que manda el front, aqui la guardo en el payload, req. body
        const response= await editUserService(id, payload);
        if(response==null) return res.status(404).json('usuario no registrado');
        res.status(200).json(response);//aqui payload recarda lo enviado
   } catch (error) {
        res.status(500).json(error.message);
    }

};

const getById=async (req, res)=>{
    try {
        const { id }= req.params;
       console.log(id)
       
        const response= await getByIdService(id);
       if(response==null) return res.status(404).json('usuario no registrado');
        res.status(200).json(response);//aqui payload recarda lo enviado
   } catch (error) {
        res.status(500).json(error.message);
    }

};

const checkUserEmail=async (req, res)=>{
    try {
        const { email }= req.query;
        const response= await getByEmailService(email);
       if(!response) return res.status(404).json(false);
        res.status(200).json(true);//aqui payload recarda lo enviado
   } catch (error) {
        res.status(500).json(error.message);
    }

};


const deleteUser=async (req, res)=>{
    try {
        const errors=validationResult(req);

if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()});
}

        const { id }= req.params;
       console.log(id)
       
        const response= await deleteUserService(id);
        if(response==null) return res.status(404).json('usuario no registrado');
        res.status(200).json(response);//aqui payload recarda lo enviado
   } catch (error) {
        res.status(500).json(error.message);
    }

};


 module.exports={
    getAllUsers,
    createUser,
    editUser,
    getById,
    deleteUser,
    checkUserEmail,
};
    
