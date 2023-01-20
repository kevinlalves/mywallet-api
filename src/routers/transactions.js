import { Router } from "express";
import indexTransactions from "../controllers/transactions/index.js";
import deleteTransaction from "../controllers/transactions/delete.js";
import updateTransaction from "../controllers/transactions/update.js";
import createTransactions from "../controllers/users/create.js";
import authenticate from "../middlewares/authenticate.js";

const router = new Router("/transactions");

router.use(authenticate);

router.get("/", indexTransactions);
router.post("/:id", createTransactions);
router.put("/:id", updateTransaction);
router.delete("/:id", deleteTransaction);

export { router as transactionsRouter };
