import { Request, Response } from "express";
import {
  listPlans,
  getPlanById,
  createPlan,
  updatePlan,
  deletePlan,
} from "../../src/lib/api/services";
import { handleServiceResult, getParamId } from "./helpers";

export async function getPlans(req: Request, res: Response) {
  try {
    const { status } = req.query;
    const result = await listPlans({ status: status as string | undefined });
    return handleServiceResult(res, result, 200, req.originalUrl);
  } catch (err: any) {
    return res.status(500).type("application/problem+json").json({
      type: "https://codeclovers.dev/errors/500",
      title: "Internal Server Error",
      status: 500,
      detail: err?.message || "Failed to retrieve plans",
      instance: req.originalUrl,
      timestamp: new Date().toISOString(),
    });
  }
}

export async function getPlan(req: Request, res: Response) {
  try {
    const id = getParamId(req);
    const result = await getPlanById(id);
    return handleServiceResult(res, result, 200, req.originalUrl);
  } catch (err: any) {
    return res.status(500).type("application/problem+json").json({
      type: "https://codeclovers.dev/errors/500",
      title: "Internal Server Error",
      status: 500,
      detail: err?.message || "Failed to retrieve plan",
      instance: req.originalUrl,
      timestamp: new Date().toISOString(),
    });
  }
}

export async function postPlan(req: Request, res: Response) {
  try {
    const result = await createPlan(req.body);
    return handleServiceResult(res, result, 201, req.originalUrl);
  } catch (err: any) {
    return res.status(500).type("application/problem+json").json({
      type: "https://codeclovers.dev/errors/500",
      title: "Internal Server Error",
      status: 500,
      detail: err?.message || "Failed to create plan",
      instance: req.originalUrl,
      timestamp: new Date().toISOString(),
    });
  }
}

export async function patchPlan(req: Request, res: Response) {
  try {
    const id = getParamId(req);
    const result = await updatePlan(id, req.body);
    return handleServiceResult(res, result, 200, req.originalUrl);
  } catch (err: any) {
    return res.status(500).type("application/problem+json").json({
      type: "https://codeclovers.dev/errors/500",
      title: "Internal Server Error",
      status: 500,
      detail: err?.message || "Failed to update plan",
      instance: req.originalUrl,
      timestamp: new Date().toISOString(),
    });
  }
}

export async function removePlan(req: Request, res: Response) {
  try {
    const id = getParamId(req);
    const result = await deletePlan(id);
    return handleServiceResult(res, result, 200, req.originalUrl);
  } catch (err: any) {
    return res.status(500).type("application/problem+json").json({
      type: "https://codeclovers.dev/errors/500",
      title: "Internal Server Error",
      status: 500,
      detail: err?.message || "Failed to delete plan",
      instance: req.originalUrl,
      timestamp: new Date().toISOString(),
    });
  }
}
