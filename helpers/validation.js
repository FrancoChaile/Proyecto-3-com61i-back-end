//validacion cacera hecha por noseotros

const { getByEmailService } = require("../services/users.services");
const { body, param } = require("express-validator");
//const { emailexistValidation } = require("../helpers/validation");

const emailexistValidation = async (email) => {
  const emailExist = await getByEmailService(email);
  if (emailExist) {
    throw new Error("el email ${email}, ya se encuentra en uso");
  }
  return false;
};

const createUserValidations = {
  email: body("email")
    .isEmail() // validacion de email
    .withMessage("el email no es valido") // validacion de email
    .not()
    .isEmpty() // validacion de email
    .withMessage("este campo es requerido") // validacion de email
    .custom(emailexistValidation), // validacion hecha por nosotros

  password: body("password") // validacion de password
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/) // validacion con expresion regular
    .withMessage("la contraseña no cumple con lo requerido"), // mensaje si no cumple
};

const deleteUserValidation = {
  id: param("id").isMongoId().withMessage("el id no cumple con lo requerido"), // mensaje si no cumple
};

module.exports = {
  createUserValidations,
  deleteUserValidation,
};
