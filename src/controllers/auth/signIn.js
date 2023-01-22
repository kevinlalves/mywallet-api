import { compare } from "bcrypt";
import chalk from "chalk";
import { sessions, users } from "../../config/database.js";
import { sessionCookieName } from "../../utils/constants.js";
import { v4 as uuidv4 } from "uuid";

export default async function signIn(req, res) {
  const { email, password } = req.body;

  console.log(chalk.cyan("POST /auth/sign-in"));
  try {
    const user = await users.findOne({ email });
    if (!user) {
      return res.status(404).res("There was a problem with your credentials");
    }

    const passwordIsValid = await compare(password, user.password);
    if (!passwordIsValid) {
      return res.status(404).res("There was a problem with your credentials");
    }

    const token = uuidv4();
    await sessions.deleteOne({ userId: user._id });
    await sessions.insertOne({ userId: user._id, token });

    res.cookie(sessionCookieName, token, {
      maxAge: 3600 * 4,
      httpOnly: true,
      sameSite: "lax"
    }).status(201).send("OK");
  }
  catch (error) {
    console.log(error);
  }
}
