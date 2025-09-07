import Joi from "joi";

const  doctorSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  speciality: Joi.string().required(),
  degree: Joi.string().required(),
  experience: Joi.string().required(),
  about: Joi.string().required(),
  available : Joi.boolean().optional(),
  fees: Joi.number().required(),
  address: Joi.string().required()
});

export default doctorSchema
