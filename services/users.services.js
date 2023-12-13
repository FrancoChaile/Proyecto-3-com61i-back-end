// funcion creada para el servicio get en la linea  const response= await getById(id)
const User= require('../models/user.model');
const { options } = require('../routes/user.routes');

const getUsersService=async()=>{
    return User.find({})

};

const getByEmailService=async(email)=>{
    return User.findOne({ email });//trae un objeto o un null con findeOne
};

 //funcion creada para el controller getById  const response= await getById(id);
const getByIdService=async(id)=>{
    return User.findById(id).select('-password, -_v')
};
// funcion creada para el controller createUser const newUser=new User(payload); y  await newUser.save()
      
const createUserService=async(payload)=>{
    const newUser= new User(payload);
    return await newUser.save();
};
const editUserService= async(id, userData)=>{
    const options={
        omitUndefined: true,
        new: true,
    }
    return await User.findByIdAndUpdate(id, userData, options).select('-password -__v');

};
const deleteUserService=async(id) =>{
    return User.findByIdAndDelete(id)
};

const getBannedUsersService = async () => {
    return await User.find({disabled: true});
  };
  
const getActiveUsersService = async () => {
    return await User.find({disabled: false});
  };
  
const getAdminUsersService = async () => {
    return await User.find({role: 'admin'});
  };

module.exports={
    getUsersService,
    getByIdService,
    createUserService,
    editUserService,
    deleteUserService,
    getByEmailService,
    getBannedUsersService,
    getActiveUsersService,
    getAdminUsersService
};