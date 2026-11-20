import { Request, Response } from "express";
import {
  listMemos,
  getMemoByIdOrSlug,
  createMemo,
  updateMemo,
  deleteMemo,
} from "../../src/lib/api/services";
import { handleServiceResult, getParamId } from "./helpers";

export async function getMemos(req: Request, res: Response) {
  try {
    const { category, search, q, status, publishedOnly, page, limit } = req.query;
    const result = await listMemos({
      category: category as string | undefined,
      search: (search || q) as string | undefined,
      status: status as string | undefined,
      publishedOnly: publishedOnly === "true",
      page: page ? parseInt(page as string, 10) : undefined,
      limit: limit ? parseInt(limit as string, 10) : undefined,
    });
    return handleServiceResult(res, result, 200, req.originalUrl);
  } catch (err: any) {
    return res.status(500).type("application/problem+json").json({
      type: "https://codeclovers.dev/errors/500",
      title: "Internal Server Error",
      status: 500,
      detail: err?.message || "Failed to retrieve memos",
      instance: req.originalUrl,
      timestamp: new Date().toISOString(),
    });
  }
}

export async function getMemo(req: Request, res: Response) {
  try {
    const id = getParamId(req);
    const result = await getMemoByIdOrSlug(id);
    return handleServiceResult(res, result, 200, req.originalUrl);
  } catch (err: any) {
    return res.status(500).type("application/problem+json").json({
      type: "https://codeclovers.dev/errors/500",
      title: "Internal Server Error",
      status: 500,
      detail: err?.message || "Failed to retrieve memo",
      instance: req.originalUrl,
      timestamp: new Date().toISOString(),
    });
  }
}

export async function postMemo(req: Request, res: Response) {
  try {
    const result = await createMemo(req.body);
    return handleServiceResult(res, result, 201, req.originalUrl);
  } catch (err: any) {
    return res.status(500).type("application/problem+json").json({
      type: "https://codeclovers.dev/errors/500",
      title: "Internal Server Error",
      status: 500,
      detail: err?.message || "Failed to create memo",
      instance: req.originalUrl,
      timestamp: new Date().toISOString(),
    });
  }
}

export async function patchMemo(req: Request, res: Response) {
  try {
    const id = getParamId(req);
    const result = await updateMemo(id, req.body);
    return handleServiceResult(res, result, 200, req.originalUrl);
  } catch (err: any) {
    return res.status(500).type("application/problem+json").json({
      type: "https://codeclovers.dev/errors/500",
      title: "Internal Server Error",
      status: 500,
      detail: err?.message || "Failed to update memo",
      instance: req.originalUrl,
      timestamp: new Date().toISOString(),
    });
  }
}

export async function removeMemo(req: Request, res: Response) {
  try {
    const id = getParamId(req);
    const result = await deleteMemo(id);
    return handleServiceResult(res, result, 200, req.originalUrl);
  } catch (err: any) {
    return res.status(500).type("application/problem+json").json({
      type: "https://codeclovers.dev/errors/500",
      title: "Internal Server Error",
      status: 500,
      detail: err?.message || "Failed to delete memo",
      instance: req.originalUrl,
      timestamp: new Date().toISOString(),
    });
  }
}
