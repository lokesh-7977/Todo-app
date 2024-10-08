import { Router } from "express"
import authRoutes from  "./auth.route"
import todoRoutes from "./todos.route"
const router = Router();

router.use("/auth", authRoutes);
router.use("/todos", todoRoutes);

export default router;
