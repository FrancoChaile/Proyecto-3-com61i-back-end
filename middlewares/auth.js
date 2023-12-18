const { header } = require('express-validator');
const jwt=require('jsonwebtoken');

const validatorToken=(req, res, next)=>{
    try {
    const token=req.headers['access-token']; 
    if (!token) return res.status(401).json('token inexistent');// aqui verifico si el token existe.
    jwt.verify(token,process.env.SECRET_KEY,(error,decoded)=>{ // verifica si es valido el token
        console.log(decoded);
        if(error) return res.status(401).json('token invalido');
        req.user=decoded;//req es un objeto y le asigno  a user lo que contien decode, data de todo el payload
        next();

    });
    
    } catch (error) {
        res.status(500).json(error.message);
        
    }

};

//protegemos el role en las rutas del adminsitrado, asi queda protegida la ruta de Admin
// endecoded tengo toda la data de paylod y la introdusco a req para luego tener
//acceso a role, req es un objeto y le puedo agregar una propiedad.



const validateRole=(req, res, next)=>{
    try {
        const user=req.user;
        if(user.role!=='admin') return res.status(401).json('usuario no autorz');
        next();
    
    } catch (error) {
        res.status(500).json(error.message);
    }   
    };

module.exports={
    validatorToken,
    validateRole,
};