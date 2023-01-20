import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import chalk from "chalk";
dotenv.config();

const client = new MongoClient(process.env.DATABASE_URL);
let db;

try {
  db = client.db();
  console.log(chalk.pink("Connected to db..."));
}
catch (error) {
  console.log(chalk.red("Failed to connect to database!"));
  console.log(error);
}

export const users = db.collection("users");
export const transactions = db.collection("transactions");
export const sessions = db.collection("sessions");
