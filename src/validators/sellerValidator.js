import Joi from "joi";

export const sellerRegisterSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

export const sellerLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});
