const { getByEmailService }=require ('../services/users.services.js');
const { passwordMatch }=require ('../helpers/passwordhasing.js');
const jwt  = require('jsonwebtoken');


const login= async(req, res)=>{
    //res.json('ok'); // probar si llega cuando estamos en la ruta login
    try {
        const { email, password }=req.body;
        const userExist=await getByEmailService(email);

        if (! userExist) return res.status(404).json('el usuario no se encuentra registrado');

        const passMatch= await passwordMatch(password, userExist.password)//recibe pass del front y el pass que esta en el user exis

        if(!passMatch) return res.status(404).json(' el email o pass son erroneas');

        const payload={                    // creo un objeto de los datos que me trae cuando ingreso
            name: userExist.name,
            lastname:userExist.lastname,
            email:userExist.email,
            _id:userExist._id,
             role:userExist.role

        };
        const token=jwt.sign(payload,process.env.SECRET_KEY, {// creo el token para mi seguridad
            expiresIn:process.env.TOKEN_EXPIRIS_IN  || 120,
        });


        //res.json('ok');// ara hacer prueba
        res.status(200).json({ msg: `Bienvenido@, ${userExist.name}!`, token, payload: JSON.stringify(payload) });   
        
    } catch (error) {
        res.status(500).json(error.message);
        
    }

};
module.exports={
    login,
};