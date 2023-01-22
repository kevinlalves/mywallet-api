import chalk from "chalk";
import { transactions } from "../../config/database.js";
import { transactionsBatch } from "../../utils/constants.js";
import internalError from "../../utils/functions/internalError.js";

export default async function indexTransactions(req, res) {
  const { user } = res.locals;
  const page = req.query.page ? Number(req.query.page) : 1;
  const per = req.query.per ? Number(req.query.per) : transactionsBatch;

  console.log(chalk.cyan("GET /transactions"));
  try {
    const userTransactions = await transactions.find({ userId: user._id })
      .sort({ updatedAt: -1 })
      .skip((page - 1) * per)
      .limit(page * per)
      .toArray();

    res.json(userTransactions);
  }
  catch (error) {
    internalError(error, res);
  }
}
