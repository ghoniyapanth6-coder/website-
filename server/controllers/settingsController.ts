import { Request, Response } from "express";
import { getAgencySettings, updateAgencySettings } from "../../src/lib/api/services";
import { handleServiceResult } from "./helpers";

export async function getSettings(_req: Request, res: Response) {
  try {
    const result = await getAgencySettings();
    return handleServiceResult(res, result, 200, "/api/settings");
  } catch (err: any) {
    return res.status(500).type("application/problem+json").json({
      type: "https://codeclovers.dev/errors/500",
      title: "Internal Server Error",
      status: 500,
      detail: err?.message || "Failed to retrieve agency settings",
      instance: "/api/settings",
      timestamp: new Date().toISOString(),
    });
  }
}

export async function patchSettings(req: Request, res: Response) {
  try {
    const result = await updateAgencySettings(req.body);
    return handleServiceResult(res, result, 200, "/api/settings");
  } catch (err: any) {
    return res.status(500).type("application/problem+json").json({
      type: "https://codeclovers.dev/errors/500",
      title: "Internal Server Error",
      status: 500,
      detail: err?.message || "Failed to update agency settings",
      instance: "/api/settings",
      timestamp: new Date().toISOString(),
    });
  }
}
