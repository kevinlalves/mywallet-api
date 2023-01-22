import Joi from "joi";

const indexTransactionsSchema = Joi.object({
  page: Joi.number().integer().min(1),
  per: Joi.number().integer().min(1)
});

export default indexTransactionsSchema;
