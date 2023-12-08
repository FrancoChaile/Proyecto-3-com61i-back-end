const bcrypt=require('bcrypt');

const hasinPassword= async(user)=>{

    const saltRounds=bcrypt.genSaltSync(10);// genero mi clave con un mnimo de 10
       user.password=bcrypt.hashSync(user.password, saltRounds)//saco el password para hasearlo
       return user;
       

};
const passwordMatch=async (password, passwordHash)=>{// esta funcion recibe el password y el passwor haseado
    return bcrypt.compareSync(password,passwordHash)//retunr de meteodo y recibe el pass del front y compara con el que esta en la base de dato, me retorna un boleano

}
module.exports={
    hasinPassword,
    passwordMatch,
};