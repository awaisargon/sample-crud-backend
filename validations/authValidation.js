const Joi = require('joi');

const signup = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
});

const login = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

module.exports = {
  signup,
  login,
};