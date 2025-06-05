import { Router } from "express";
import helloRoutes from "./hello.routes";

const router = Router();

// Register v1 routes
router.use("/hello", helloRoutes);

export default router;
