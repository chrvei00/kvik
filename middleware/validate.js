const joi = require("joi");
const { eError } = require("./error");
//Validations -- JOI

//reklamasjon-validation
const reklamasjonValSchema = joi.object({
  reklamasjon: joi
    .object({
      name: joi.string().required(),
      email: joi.string().email().email().required(),
      telefon: joi.number().required(),
      ordnr: joi.string().min(8).required(),
      buydate: joi.date().greater("1-1-2000").less("now").required(),
      montering: joi.boolean().required(),
      beskrivelse: joi.string().required(),
    })
    .required(),
  "g-recaptcha-response": joi.string().required(),
});

const validateReklamasjon = (req, res, next) => {
  const { error } = reklamasjonValSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new eError(msg, 400);
  } else next();
};

//bruker-validation
const brukerValSchema = joi.object({
  name: joi.string().required(),
  telefon: joi.number().required(),
  rolle: joi.string().required(),
  sex: joi.boolean().required(),
  username: joi.string().email().required(),
  password: joi.string().required(),
});

const validateBruker = (req, res, next) => {
  const { error } = brukerValSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new eError(msg, 400);
  } else next();
};

//bruker-validation
const loginValSchema = joi.object({
  username: joi.string().email().required(),
  password: joi.string().required(),
});

const validateLogin = (req, res, next) => {
  const { error } = loginValSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new eError(msg, 400);
  } else next();
};

module.exports = {
  validateReklamasjon,
  validateBruker,
  validateLogin,
};
