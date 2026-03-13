import { app } from "./app.js";
import { connectDb } from "./config/db.js";
import { env } from "./config/env.js";
import { logger } from "./config/logger.js";
import { startCleanupJobs } from "./jobs/cleanupJobs.js";

const bootstrap = async () => {
  await connectDb();
  app.listen(env.PORT, () => {
    logger.info(`Backend listening on http://localhost:${env.PORT}`);
  });
  startCleanupJobs();
};

bootstrap().catch((error) => {
  logger.error("Failed to start server", { error: String(error) });
  process.exit(1);
});
