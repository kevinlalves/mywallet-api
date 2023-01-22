import chalk from "chalk";
import { users } from "../../config/database.js";
import { hash } from "bcrypt";
import { saltRounds } from "../../utils/constants.js";
import internalError from "../../utils/internalError.js";

export default async function createUser(req, res) {
  const { name, email, password } = req.body;

  console.log(chalk.cyan("POST /users"));
  try {
    const user = await users.findOne({ email });
    if (user) {
      return res.status(409).send("There was a problem creating your account");
    }

    const passwordHash = await hash(password, saltRounds);
    await users.insertOne({ name, email, password: passwordHash });

    res.status(201).send("OK");
  }
  catch (error) {
    internalError(error, res);
  }
}
