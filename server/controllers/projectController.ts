import { Request, Response } from "express";
import {
  listProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from "../../src/lib/api/services";
import { handleServiceResult, getParamId } from "./helpers";

export async function getProjects(req: Request, res: Response) {
  try {
    const { category, status } = req.query;
    const result = await listProjects({
      category: category as string | undefined,
      status: status as string | undefined,
    });
    return handleServiceResult(res, result, 200, req.originalUrl);
  } catch (err: any) {
    return res.status(500).type("application/problem+json").json({
      type: "https://codeclovers.dev/errors/500",
      title: "Internal Server Error",
      status: 500,
      detail: err?.message || "Failed to retrieve projects",
      instance: req.originalUrl,
      timestamp: new Date().toISOString(),
    });
  }
}

export async function getProject(req: Request, res: Response) {
  try {
    const id = getParamId(req);
    const result = await getProjectById(id);
    return handleServiceResult(res, result, 200, req.originalUrl);
  } catch (err: any) {
    return res.status(500).type("application/problem+json").json({
      type: "https://codeclovers.dev/errors/500",
      title: "Internal Server Error",
      status: 500,
      detail: err?.message || "Failed to retrieve project",
      instance: req.originalUrl,
      timestamp: new Date().toISOString(),
    });
  }
}

export async function postProject(req: Request, res: Response) {
  try {
    const result = await createProject(req.body);
    return handleServiceResult(res, result, 201, req.originalUrl);
  } catch (err: any) {
    return res.status(500).type("application/problem+json").json({
      type: "https://codeclovers.dev/errors/500",
      title: "Internal Server Error",
      status: 500,
      detail: err?.message || "Failed to create project",
      instance: req.originalUrl,
      timestamp: new Date().toISOString(),
    });
  }
}

export async function patchProject(req: Request, res: Response) {
  try {
    const id = getParamId(req);
    const result = await updateProject(id, req.body);
    return handleServiceResult(res, result, 200, req.originalUrl);
  } catch (err: any) {
    return res.status(500).type("application/problem+json").json({
      type: "https://codeclovers.dev/errors/500",
      title: "Internal Server Error",
      status: 500,
      detail: err?.message || "Failed to update project",
      instance: req.originalUrl,
      timestamp: new Date().toISOString(),
    });
  }
}

export async function removeProject(req: Request, res: Response) {
  try {
    const id = getParamId(req);
    const result = await deleteProject(id);
    return handleServiceResult(res, result, 200, req.originalUrl);
  } catch (err: any) {
    return res.status(500).type("application/problem+json").json({
      type: "https://codeclovers.dev/errors/500",
      title: "Internal Server Error",
      status: 500,
      detail: err?.message || "Failed to delete project",
      instance: req.originalUrl,
      timestamp: new Date().toISOString(),
    });
  }
}
