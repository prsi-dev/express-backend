import express from "express";
import { config } from "./config";
import { setupCommonMiddleware } from "./middlewares/common";
import { errorHandler, notFoundHandler } from "./middlewares/error";
import routes from "./routes";

const app = express();

// Setup common middleware (cors, helmet, body-parser, morgan)
setupCommonMiddleware(app);

// Mount API routes
app.use(config.apiPrefix, routes);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
