const Joi = require('joi');

const createCategory = Joi.object({
  title: Joi.string().required(),
});

const updateCategory = Joi.object({
  title: Joi.string().required(),
});

module.exports = {
  createCategory,
  updateCategory,
};