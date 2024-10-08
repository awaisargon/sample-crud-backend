const httpStatus = require('http-status');
const messages = require('../constants/messages');

const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    const errorMessage = error.details.map((detail) => detail.message).join(', ');
    return res.status(httpStatus.BAD_REQUEST).json({
      message: messages.VALIDATION.INVALID_DATA,
      error: errorMessage,
    });
  }
  next();
};

module.exports = validate;