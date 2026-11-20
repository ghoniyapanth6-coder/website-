import mongoose from "mongoose";

/**
 * Global cache interface for Mongoose connection caching in serverless / Next.js hot-reloading environments.
 */
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/codeclovers";

let cached: MongooseCache = global.mongooseCache || { conn: null, promise: null };

if (!global.mongooseCache) {
  global.mongooseCache = cached;

  // Set up event listeners once
  mongoose.connection.on("connected", () => {
    console.log(`[MongoDB] Successfully connected to database: ${mongoose.connection.name || "codeclovers"}`);
  });

  mongoose.connection.on("error", (err) => {
    console.error("[MongoDB] Database connection error:", err);
  });

  mongoose.connection.on("disconnected", () => {
    console.warn("[MongoDB] Database connection disconnected");
  });
}

/**
 * Connects to MongoDB with singleton connection reuse across serverless invocations and Next.js hot reloads.
 * @returns Cached or newly established Mongoose instance
 */
export async function connectToDatabase(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts: mongoose.ConnectOptions = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 2500,
      connectTimeoutMS: 2500,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error("[MongoDB] Failed to establish database connection:", e);
    throw e;
  }

  return cached.conn;
}

let lastFailedAttempt = 0;
const RETRY_INTERVAL_MS = 10000;

/**
 * Check if MongoDB is currently connected.
 */
export function isConnected(): boolean {
  return mongoose.connection.readyState === 1;
}

/**
 * Safely attempt to connect to MongoDB with a circuit breaker backoff.
 * Returns true if connected, false if unavailable.
 */
export async function tryConnectToDatabase(): Promise<boolean> {
  if (isConnected()) return true;

  const now = Date.now();
  if (now - lastFailedAttempt < RETRY_INTERVAL_MS) {
    return false;
  }

  try {
    await connectToDatabase();
    return true;
  } catch {
    lastFailedAttempt = Date.now();
    return false;
  }
}

export default connectToDatabase;
