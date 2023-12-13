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
  disableUser,
  unbanUser,
  adminUser,
  clientUser,
  uploadAvatar,
} = require("../controllers/users.controllers");

const multer = require("multer");
const upload = multer({ dest: "uploads/" });


const { validatorToken, validateRole, jwtValidatorAdmin, jwtValidatorOwner } = require("../middlewares/auth");
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

route.delete("/delete-user/:id",
[deleteUserValidation.id],
validatorToken,// rutas para hacer delete protegidas con token
validateRole,// rutas protegidas solo para borrar como admin
deleteUser);

route.patch('/disable-user/:id', jwtValidatorAdmin, disableUser);

route.patch('/unban-user/:id', jwtValidatorAdmin, unbanUser)

route.patch('/user-admin/:id', jwtValidatorAdmin, adminUser);

route.patch("/user-client/:id", jwtValidatorAdmin, clientUser);

route.post("/upload-avatar/:id", upload.single("avatar"), validatorToken, uploadAvatar);

module.exports = route; // exportar
