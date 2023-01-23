import { compare } from "bcrypt";
import chalk from "chalk";
import { sessions, users } from "../../config/database.js";
import { v4 as uuidv4 } from "uuid";
import internalError from "../../utils/functions/internalError.js";

export default async function signIn(req, res) {
  const { email, password } = req.body;

  console.log(chalk.cyan("POST /auth/sign-in"));
  try {
    const user = await users.findOne({ email });
    if (!user) {
      return res.status(404).send("There was a problem with your credentials");
    }

    const passwordIsValid = await compare(password, user.password);
    if (!passwordIsValid) {
      return res.status(404).send("There was a problem with your credentials");
    }

    const token = uuidv4();
    await sessions.deleteOne({ userId: user._id });
    await sessions.insertOne({ userId: user._id, token });

    res.status(201).json({ token, name: user.name });
  }
  catch (error) {
    internalError(error, res);
  }
}
