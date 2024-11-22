import { Router } from "express";
import * as UserController from "../controllers/user.js"
import { requiresAuth } from "../middleware/auth.js";

const router = Router();

router.get("/", requiresAuth, UserController.getAuthenticatedUser);
router.post("/signup", UserController.signUp);
router.post("/login", UserController.logIn);
router.post("/logout", UserController.logout);

export default router;