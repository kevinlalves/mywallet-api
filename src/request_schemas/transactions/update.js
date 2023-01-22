import Joi from "joi";

const updateTransactionSchema = Joi.object({
  id: Joi.string().required(),
  description: Joi.string().required(),
  amountCents: Joi.number().integer().required()
});

export default updateTransactionSchema;
