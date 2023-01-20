import { Router } from "express";
import createUser from "../controllers/users/create.js";

const router = new Router("/users");

router.post("/:id", createUser);
