import chalk from "chalk";
import { transactions } from "../../config/database.js";
import formatDate from "../../utils/functions/formatDate.js";
import internalError from "../../utils/functions/internalError.js";

export default async function createTransactions(req, res) {
  const { user } = res.locals;
  const { description, amountCents } = req.body;

  console.log(chalk.cyan("POST /transactions"));
  try {
    await transactions.insertOne({
      description,
      amountCents: Number(amountCents),
      userId: user._id,
      updatedAt: Date.now(),
      creationDate: formatDate(new Date())
    });

    res.status(201).send("OK");
  }
  catch (error) {
    internalError(error, res);
  }
}
