import { Router } from "express";
import indexTransactions from "../controllers/transactions/index.js";
import deleteTransaction from "../controllers/transactions/delete.js";
import updateTransaction from "../controllers/transactions/update.js";
import createTransactions from "../controllers/users/create.js";
import authenticate from "../middlewares/authenticate.js";
import validateSchema from "../middlewares/validateSchema.js";
import createTransactionSchema from "../request_schemas/transactions/create.js";
import updateTransactionSchema from "../request_schemas/transactions/update.js";
import idOnlySchema from "../request_schemas/idOnly.js";

const router = new Router("/transactions");

router.use(authenticate);

router.get("/", indexTransactions);
router.post("/", validateSchema(createTransactionSchema), createTransactions);
router.put("/:id", validateSchema(updateTransactionSchema), updateTransaction);
router.delete("/:id", validateSchema(idOnlySchema), deleteTransaction);

export { router as transactionsRouter };
