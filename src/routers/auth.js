import { Router } from "express";
import signIn from "../controllers/auth/signIn.js";
import signOut from "../controllers/auth/signOut.js";
import authenticate from "../middlewares/authenticate.js";
import validateSchema from "../middlewares/validateSchema.js";
import signInSchema from "../request_schemas/auth/signIn.js";

const router = new Router("/auth");

router.post("/sign-in", validateSchema(signInSchema), signIn);
router.delete("/sign-out", authenticate, signOut);

export { router as authRouter };
