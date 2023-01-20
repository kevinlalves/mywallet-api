import { Router } from "express";
import signIn from "../controllers/auth/sign-in";
import signOut from "../controllers/auth/sign-out";
import authenticate from "../middlewares/authenticate";

const router = new Router("/auth");

router.post("/sign-in", signIn);
router.post("/sign-out", authenticate, signOut);

export { router as authRouter };
