import chalk from "chalk";
import { sessions } from "../../config/database.js";
import internalError from "../../utils/functions/internalError.js";

export default async function signOut(req, res) {
  const { user } = res.locals;

  console.log(chalk.cyan("POST /auth/sign-out"));
  try {
    await sessions.deleteOne({ userId: user._id });

    res.send("OK");
  }
  catch (error) {
    internalError(error, res);
  }
}
