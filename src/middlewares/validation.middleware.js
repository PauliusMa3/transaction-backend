const Joi = require("joi").defaults((schema) =>
  schema.options({
    allowUnknown: true
  })
);
const httpStatus = require("http-status");

const validationMiddleware = (schema) => {
  return (req, res, next) => {
    const { body } = req;
    const { error } = Joi.compile(schema).validate(body);

    if (error) {
      const { details } = error;
      const validationErrorMessages = details
        .map((detail) => detail.message)
        .join(",");

      return res.status(httpStatus.BAD_REQUEST).json({
        error: validationErrorMessages
      });
    }

    return next();
  };
};

module.exports = validationMiddleware;
