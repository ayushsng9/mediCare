import Joi from "joi";

const registerUserSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    "string.empty": "Name is required",
    "string.min": "Name should have at least 3 characters",
    "any.required": "Name is required"
  }),

  email: Joi.string().email().required().messages({
    "string.email": "Enter a valid email",
    "any.required": "Email is required"
  }),

  password: Joi.string().min(8).required().messages({
    "string.min": "Password must be at least 8 characters long",
    "any.required": "Password is required"
  })
});

const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});


const updateProfileSchema = Joi.object({
  name: Joi.string().min(2).max(50).optional(),
  phone: Joi.string().pattern(/^[0-9]{10}$/).optional(),
  address: Joi.string().optional(),
  dob: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}$/) // YYYY-MM-DD format
    .optional()
    .messages({
      "string.pattern.base": "Date of Birth must be in YYYY-MM-DD format",
    }),
  gender: Joi.string().valid("Male", "Female", "Other", "Not Selected").optional(),
});


export {registerUserSchema,loginUserSchema,updateProfileSchema}


