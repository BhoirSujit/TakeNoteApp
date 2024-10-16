import { Router } from "express";
import * as UserController from "../controllers/user"

const router = Router();

router.get("/", UserController.getAuthenticatedUser);
router.post("/signup", UserController.signUp);
router.post("/login", UserController.logIn);
router.post("/logout", UserController.logout);

export default router;