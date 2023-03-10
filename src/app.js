import express, { json } from "express";
import cors from "cors";
import helmet from "helmet";
import chalk from "chalk";
import dotenv from "dotenv";
import { authRouter } from "./routers/auth.js";
import { transactionsRouter } from "./routers/transactions.js";
import { usersRouter } from "./routers/users.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.disable("x-powered-by");
app.use(helmet());
app.use(cors());
app.use(json());

app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/transactions", transactionsRouter);

app.listen(PORT, () => {
  console.log(chalk.green(`Server listening on port ${PORT}`));
});
