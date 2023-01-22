import Joi from "joi";

const createTransactionSchema = Joi.object({
  description: Joi.string().required(),
  amountCents: Joi.number().integer().required()
});

export default createTransactionSchema;
