import Joi from "joi";

const authenticateSchema = Joi.object({
  token: Joi.string().required()
});

export default authenticateSchema;
