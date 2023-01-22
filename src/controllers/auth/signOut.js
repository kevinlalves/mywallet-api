import chalk from "chalk";
import { sessions } from "../../config/database.js";
import { sessionCookieName } from "../../utils/constants.js";

export default async function signOut(req, res) {
  const { user } = res.locals;

  console.log(chalk.cyan("POST /auth/sign-out"));
  try {
    await sessions.deleteOne({ userId: user._id });

    res.clearCookie(sessionCookieName).send("OK");
  }
  catch (error) {
    console.log(error);
  }
}