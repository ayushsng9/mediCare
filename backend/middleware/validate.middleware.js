import ApiError from "../utils/ApiError.js";

const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      return next(new ApiError(400, error.details.map(d => d.message).join(", ")));
    }

    next();
  };
};

export default validate
