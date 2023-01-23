import chalk from "chalk";
import { transactions } from "../../config/database.js";
import { ObjectId } from "mongodb";
import internalError from "../../utils/functions/internalError.js";

export default async function deleteTransaction(req, res) {
  const { user } = res.locals;
  const { id } = req.params;
  let _id;

  console.log(chalk.cyan(`DELETE /transactions/${id}`));
  try {
    _id = ObjectId(id);
  }
  catch {
    return res.sendStatus(404);
  }

  try {
    const { deletedCount } = await transactions.deleteOne({ userId: user._id, _id });

    if (!deletedCount) {
      return res.sendStatus(404);
    }

    res.send("OK");
  }
  catch (error) {
    internalError(error, res);
  }
}
