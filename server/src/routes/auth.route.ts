import { Router } from "express";
import { register, login , logOut } from "../controllers/auth.controller";
import {authMiddleware} from "../middlewares/auth.middleware"

const router = Router();

router.post("/sign-up", register);
router.post("/sign-in",login)
router.get("/sign-out",authMiddleware,logOut) 

export default router;