import { Request, Response } from "express";
import { getHealthStatus } from "../../src/lib/api/services";

export async function getHealth(_req: Request, res: Response) {
  try {
    const health = await getHealthStatus();
    return res.status(200).json(health);
  } catch (err: any) {
    return res.status(500).type("application/problem+json").json({
      type: "https://codeclovers.dev/errors/500",
      title: "Internal Server Error",
      status: 500,
      detail: err?.message || "Health check failed",
      instance: "/api/health",
      timestamp: new Date().toISOString(),
    });
  }
}
