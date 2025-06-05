import { Router } from "express";
import { getHello } from "../../modules/hello/hello.controller";

const router = Router();

// GET /api/v1/hello - Get hello message
router.get("/", getHello);

export default router;
