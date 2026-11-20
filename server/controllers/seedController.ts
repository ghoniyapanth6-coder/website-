import { Request, Response } from "express";
import { seedAllCollections } from "../../src/lib/api/services";
import { handleServiceResult } from "./helpers";

export async function postSeed(_req: Request, res: Response) {
  try {
    const result = await seedAllCollections();
    return handleServiceResult(res, result, 200, "/api/seed");
  } catch (err: any) {
    return res.status(500).type("application/problem+json").json({
      type: "https://codeclovers.dev/errors/500",
      title: "Internal Server Error",
      status: 500,
      detail: err?.message || "Failed to seed database",
      instance: "/api/seed",
      timestamp: new Date().toISOString(),
    });
  }
}
