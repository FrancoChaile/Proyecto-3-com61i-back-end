// 4 paso , crear rutas

const { Router } = require("express"); // requerimos router una sola herramienta de express
const route = Router(); // creamos una instancia
const {
  getAllUsers,
  createUser,
  editUser,
  getById,
  deleteUser,
  checkUserEmail,
} = require("../controllers/users.controllers");


const { validatorToken, validateRole } = require("../middlewares/auth");
const { createUserValidations, deleteUserValidation } = require("../helpers/validation");

route.get("/get-users"
// ,validatorToken// rutas para hacer delete protegidas con token
// ,validateRole// rutas protegidas solo para borrar como admin 

,getAllUsers); //importo getAllUser desde controller, es mas modular
// rutas para hacer delete protegidas con token
// rutas protegidas solo para borrar como admin

route.post(// validacion de email
    "/create" // validacion de email
     , [createUserValidations.email]
     ,[createUserValidations.password]
    , createUser); //importo createUser desde controller, es mas modular
//route.post("/create",  createUser); //importo createUser desde controller, es mas modular

route.patch("/edit/:id"
    , validatorToken
    , validateRole
    , editUser); //importo getAllUser desde controller, es mas modular

route.get("/getById/:id"
,validatorToken
// , validateRole
, getById); //importo getById  desde controller, es mas modular
// rutas para hacer delete protegidas con token
// rutas protegidas solo para borrar como admin
route.get("/checkUserEmail", checkUserEmail);

route.delete("/delete/:id",
[deleteUserValidation.id],
validatorToken,// rutas para hacer delete protegidas con token
validateRole,// rutas protegidas solo para borrar como admin
deleteUser);

module.exports = route; // exportar
