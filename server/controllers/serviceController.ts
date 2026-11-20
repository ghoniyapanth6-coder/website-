import { Request, Response } from "express";
import {
  listServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
} from "../../src/lib/api/services";
import { handleServiceResult, getParamId } from "./helpers";

export async function getServices(req: Request, res: Response) {
  try {
    const { category, status } = req.query;
    const result = await listServices({
      category: category as string | undefined,
      status: status as string | undefined,
    });
    return handleServiceResult(res, result, 200, req.originalUrl);
  } catch (err: any) {
    return res.status(500).type("application/problem+json").json({
      type: "https://codeclovers.dev/errors/500",
      title: "Internal Server Error",
      status: 500,
      detail: err?.message || "Failed to retrieve services",
      instance: req.originalUrl,
      timestamp: new Date().toISOString(),
    });
  }
}

export async function getService(req: Request, res: Response) {
  try {
    const id = getParamId(req);
    const result = await getServiceById(id);
    return handleServiceResult(res, result, 200, req.originalUrl);
  } catch (err: any) {
    return res.status(500).type("application/problem+json").json({
      type: "https://codeclovers.dev/errors/500",
      title: "Internal Server Error",
      status: 500,
      detail: err?.message || "Failed to retrieve service",
      instance: req.originalUrl,
      timestamp: new Date().toISOString(),
    });
  }
}

export async function postService(req: Request, res: Response) {
  try {
    const result = await createService(req.body);
    return handleServiceResult(res, result, 201, req.originalUrl);
  } catch (err: any) {
    return res.status(500).type("application/problem+json").json({
      type: "https://codeclovers.dev/errors/500",
      title: "Internal Server Error",
      status: 500,
      detail: err?.message || "Failed to create service",
      instance: req.originalUrl,
      timestamp: new Date().toISOString(),
    });
  }
}

export async function patchService(req: Request, res: Response) {
  try {
    const id = getParamId(req);
    const result = await updateService(id, req.body);
    return handleServiceResult(res, result, 200, req.originalUrl);
  } catch (err: any) {
    return res.status(500).type("application/problem+json").json({
      type: "https://codeclovers.dev/errors/500",
      title: "Internal Server Error",
      status: 500,
      detail: err?.message || "Failed to update service",
      instance: req.originalUrl,
      timestamp: new Date().toISOString(),
    });
  }
}

export async function removeService(req: Request, res: Response) {
  try {
    const id = getParamId(req);
    const result = await deleteService(id);
    return handleServiceResult(res, result, 200, req.originalUrl);
  } catch (err: any) {
    return res.status(500).type("application/problem+json").json({
      type: "https://codeclovers.dev/errors/500",
      title: "Internal Server Error",
      status: 500,
      detail: err?.message || "Failed to delete service",
      instance: req.originalUrl,
      timestamp: new Date().toISOString(),
    });
  }
}
