import chalk from "chalk";
import { transactions } from "../../config/database.js";
import { ObjectId } from "mongodb";
import internalError from "../../utils/functions/internalError.js";

export default async function updateTransaction(req, res) {
  const { user } = res.locals;
  const { id } = req.params;
  const { description, amountCents } = req.body;

  console.log(chalk.cyan(`PUT /transactions/${id}`));
  try {
    _id = ObjectId(id);
  }
  catch {
    return res.sendStatus(404);
  }

  try {
    const { matchedCount } = await transactions.updateOne({ userId: user._id, _id: ObjectId(id) }, {
      $set: {
        description,
        amountCents,
        updatedAt: Date.now()
      }
    });

    if (!matchedCount) {
      return res.sendStatus(404);
    }

    res.send("OK");
  }
  catch (error) {
    internalError(error, res);
  }
}
