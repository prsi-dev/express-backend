import { Router } from "express";
import helloRoutes from "./hello.routes";
import movieRoutes from "../../modules/movies/movie.routes";

const router = Router();

// Register v1 routes
router.use("/hello", helloRoutes);
router.use("/movies", movieRoutes);

export default router;
