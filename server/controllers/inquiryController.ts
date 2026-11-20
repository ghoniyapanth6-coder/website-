import { Request, Response } from "express";
import {
  listInquiries,
  getInquiryById,
  createInquiry,
  updateInquiry,
  deleteInquiry,
} from "../../src/lib/api/services";
import { handleServiceResult, getParamId } from "./helpers";

export async function getInquiries(req: Request, res: Response) {
  try {
    const { search, q, status, priority, page, limit } = req.query;
    const result = await listInquiries({
      search: (search || q) as string | undefined,
      status: status as string | undefined,
      priority: priority as string | undefined,
      page: page ? parseInt(page as string, 10) : undefined,
      limit: limit ? parseInt(limit as string, 10) : undefined,
    });
    return handleServiceResult(res, result, 200, req.originalUrl);
  } catch (err: any) {
    return res.status(500).type("application/problem+json").json({
      type: "https://codeclovers.dev/errors/500",
      title: "Internal Server Error",
      status: 500,
      detail: err?.message || "Failed to retrieve inquiries",
      instance: req.originalUrl,
      timestamp: new Date().toISOString(),
    });
  }
}

export async function getInquiry(req: Request, res: Response) {
  try {
    const id = getParamId(req);
    const result = await getInquiryById(id);
    return handleServiceResult(res, result, 200, req.originalUrl);
  } catch (err: any) {
    return res.status(500).type("application/problem+json").json({
      type: "https://codeclovers.dev/errors/500",
      title: "Internal Server Error",
      status: 500,
      detail: err?.message || "Failed to retrieve inquiry",
      instance: req.originalUrl,
      timestamp: new Date().toISOString(),
    });
  }
}

export async function postInquiry(req: Request, res: Response) {
  try {
    const result = await createInquiry(req.body);
    return handleServiceResult(res, result, 201, req.originalUrl);
  } catch (err: any) {
    return res.status(500).type("application/problem+json").json({
      type: "https://codeclovers.dev/errors/500",
      title: "Internal Server Error",
      status: 500,
      detail: err?.message || "Failed to create inquiry",
      instance: req.originalUrl,
      timestamp: new Date().toISOString(),
    });
  }
}

export async function patchInquiry(req: Request, res: Response) {
  try {
    const id = getParamId(req);
    const result = await updateInquiry(id, req.body);
    return handleServiceResult(res, result, 200, req.originalUrl);
  } catch (err: any) {
    return res.status(500).type("application/problem+json").json({
      type: "https://codeclovers.dev/errors/500",
      title: "Internal Server Error",
      status: 500,
      detail: err?.message || "Failed to update inquiry",
      instance: req.originalUrl,
      timestamp: new Date().toISOString(),
    });
  }
}

export async function removeInquiry(req: Request, res: Response) {
  try {
    const id = getParamId(req);
    const result = await deleteInquiry(id);
    return handleServiceResult(res, result, 200, req.originalUrl);
  } catch (err: any) {
    return res.status(500).type("application/problem+json").json({
      type: "https://codeclovers.dev/errors/500",
      title: "Internal Server Error",
      status: 500,
      detail: err?.message || "Failed to delete inquiry",
      instance: req.originalUrl,
      timestamp: new Date().toISOString(),
    });
  }
}
