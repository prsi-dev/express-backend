import app from "./app";
import { config, validateConfig } from "./config";

const startServer = (): void => {
  try {
    // Validate environment configuration
    validateConfig();

    app.listen(config.port, () => {
      console.log(
        `Server is running in ${config.env} mode at http://localhost:${config.port}`
      );
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
