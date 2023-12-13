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

const editUserValidations = {
name: body('name')
    .trim()
    .notEmpty()
    .withMessage('El nombre es requerido.')
    .isLength({ min: 2, max: 50 })
    .withMessage('El nombre debe tener entre 2 y 50 caracteres.')
    .matches(/^[a-zA-ZÁÉÍÓÚÑáéíóúñ'-]+(\s[a-zA-ZÁÉÍÓÚÑáéíóúñ'-]+)*$/)
    .withMessage(
      "El nombre solo puede contener letras y los siguientes caracteres especiales: -'"
    ),
lastname: body('lastname')
    .trim()
    .notEmpty()
    .withMessage('El apellido es requerido.')
    .isLength({ min: 2, max: 50 })
    .withMessage('El apellido debe tener entre 2 y 50 caracteres.')
    .matches(/^[a-zA-ZÁÉÍÓÚÑáéíóúñ'-]+(\s[a-zA-ZÁÉÍÓÚÑáéíóúñ'-]+)*$/)
    .withMessage(
      "El apellido solo puede contener letras y los siguientes caracteres especiales: - '"
    ),
email: body('email')
    .trim()
    .notEmpty()
    .withMessage('El email es obligatorio.')
    .isLength({ min: 5, max: 100 })
    .withMessage('El email debe contener entre 5 y 100 caracteres.')
    .isEmail()
    .withMessage('Debe ingresar un correo electrónico válido.')
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)
    .withMessage('El correo electrónico debe tener un formato válido.'),
disabled: body('disabled')
    .not()
    .exists()
    .withMessage('No puede ingresar valores a esta propiedad.'),
role: body('role')
    .not()
    .exists()
    .withMessage('No puede ingresar valores a esta propiedad.'),
pending: body('pending')
    .not()
    .exists()
    .withMessage('No puede ingresar valores a esta propiedad.'),
finalized: body('finalized')
    .not()
    .exists()
    .withMessage('No puede ingresar valores a esta propiedad.'),  
  }

module.exports = {
  createUserValidations,
  deleteUserValidation,
  editUserValidations,
};
