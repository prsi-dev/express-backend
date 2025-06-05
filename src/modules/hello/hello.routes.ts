import { Router } from "express";
import { getHello } from "./hello.controller";

const router = Router();

// GET /api/hello - Get hello message
router.get("/", getHello);

export default router;
