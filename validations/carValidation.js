const Joi = require('joi');

const createCar = Joi.object({
  title: Joi.string().required(),
  color: Joi.string().required(),
  model: Joi.string().required(),
  make: Joi.string().required(),
  registrationNo: Joi.string().required(),
  categoryId: Joi.string().required(),
});

const updateCar = Joi.object({
  title: Joi.string(),
  color: Joi.string(),
  model: Joi.string(),
  make: Joi.string(),
  registrationNo: Joi.string(),
  categoryId: Joi.string(),
}).min(1);

module.exports = {
  createCar,
  updateCar,
};