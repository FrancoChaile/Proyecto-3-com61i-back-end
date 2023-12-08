const { getByEmailService }=require ('../services/users.services.js');
const { passwordMatch }=require ('../helpers/passwordhasing.js');
const jwt  = require('jsonwebtoken');


const login= async(req, res)=>{
    //res.json('ok'); // probar si llega cuando estamos en la ruta login
    try {
        const { email, password }=req.body;
        const userExis=await getByEmailService(email);

        if (! userExis) return res.status(404).json('el usuario no se encuentra registrado');

        const passMatch= await passwordMatch(password, userExis.password)//recibe pass del front y el pass que esta en el user exis

        if(!passMatch) return res.status(404).json(' el email o pass son erroneas');

        const payload={                    // creo un objeto de los datos que me trae cuando ingreso
            name: userExis.name,
            lastname:userExis.lastname,
            email:userExis.email,
            _id:userExis._id,
             role:userExis.role

        };
        const token=jwt.sign(payload,process.env.SECRET_KEY, {// creo el token para mi seguridad
            expiresIn:process.env.TOKEN_EXPIRIS_IN  || 120,
        });


        //res.json('ok');// ara hacer prueba
        res.status(200).json({msg:'login successfully', token});   
        
    } catch (error) {
        res.status(500).json(error.message);
        
    }

};
module.exports={
    login,
};