import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import apiRouter from "./routes";
import { tryConnectToDatabase, isConnected } from "../src/lib/db";

const app = express();
const PORT = process.env.SERVER_PORT || 4000;

// Middleware
app.use(helmet());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);
app.use(express.json());

// Request logging in development
if (process.env.NODE_ENV !== "test") {
  app.use((req, _res, next) => {
    console.log(`[Express] ${req.method} ${req.url}`);
    next();
  });
}

// Mount REST API routes
app.use("/api", apiRouter);

// Root greeting endpoint
app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    agency: "CodeClovers Studio API",
    version: "1.0.0",
    docs: "/api/health",
    database: isConnected() ? "connected" : "disconnected (fallback mock mode active)",
    timestamp: new Date().toISOString(),
  });
});

// RFC 7807 404 Handler
app.use((req: Request, res: Response) => {
  res.status(404).type("application/problem+json").json({
    type: "https://codeclovers.dev/errors/404",
    title: "Resource Not Found",
    status: 404,
    detail: `Route ${req.method} ${req.path} not found on this server.`,
    instance: req.path,
    timestamp: new Date().toISOString(),
  });
});

// RFC 7807 Global Error Handler
app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
  console.error("[Express Error]", err);
  const status = err.status || 500;
  res.status(status).type("application/problem+json").json({
    type: `https://codeclovers.dev/errors/${status}`,
    title: err.name || "Internal Server Error",
    status,
    detail: err.message || "An unexpected error occurred processing your request.",
    instance: req.path,
    timestamp: new Date().toISOString(),
  });
});

// Start standalone server
async function bootstrap() {
  console.log("==================================================");
  console.log("   CodeClovers Standalone Express API Server");
  console.log("==================================================");

  const dbOk = await tryConnectToDatabase();
  if (dbOk) {
    console.log("[MongoDB] Connected to database instance.");
  } else {
    console.warn("[MongoDB] Offline or not reachable. Running in resilient mock-fallback mode.");
  }

  app.listen(PORT, () => {
    console.log(`[Express] Server is listening on http://localhost:${PORT}`);
    console.log(`[Express] Health check: http://localhost:${PORT}/api/health`);
    console.log(`[Express] Inquiries:    http://localhost:${PORT}/api/inquiries`);
    console.log(`[Express] Memos:        http://localhost:${PORT}/api/memos`);
  });
}

// Only start listening when executed directly
const isMainModule =
  process.argv[1] &&
  (process.argv[1].endsWith("server.ts") ||
    process.argv[1].endsWith("server.js") ||
    process.argv[1].includes("server"));

if (isMainModule && process.env.NODE_ENV !== "test") {
  bootstrap().catch((err) => {
    console.error("[Express] Bootstrap failed:", err);
  });
}

export { app };
export default app;
