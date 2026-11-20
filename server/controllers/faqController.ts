import { Request, Response } from "express";
import {
  listFaqs,
  getFaqById,
  createFaq,
  updateFaq,
  deleteFaq,
} from "../../src/lib/api/services";
import { handleServiceResult, getParamId } from "./helpers";

export async function getFaqs(req: Request, res: Response) {
  try {
    const { targetPage, page, category, search, q } = req.query;
    const result = await listFaqs({
      targetPage: (targetPage || page) as string | undefined,
      category: category as string | undefined,
      search: (search || q) as string | undefined,
    });
    return handleServiceResult(res, result, 200, req.originalUrl);
  } catch (err: any) {
    return res.status(500).type("application/problem+json").json({
      type: "https://codeclovers.dev/errors/500",
      title: "Internal Server Error",
      status: 500,
      detail: err?.message || "Failed to retrieve FAQs",
      instance: req.originalUrl,
      timestamp: new Date().toISOString(),
    });
  }
}

export async function getFaq(req: Request, res: Response) {
  try {
    const id = getParamId(req);
    const result = await getFaqById(id);
    return handleServiceResult(res, result, 200, req.originalUrl);
  } catch (err: any) {
    return res.status(500).type("application/problem+json").json({
      type: "https://codeclovers.dev/errors/500",
      title: "Internal Server Error",
      status: 500,
      detail: err?.message || "Failed to retrieve FAQ",
      instance: req.originalUrl,
      timestamp: new Date().toISOString(),
    });
  }
}

export async function postFaq(req: Request, res: Response) {
  try {
    const result = await createFaq(req.body);
    return handleServiceResult(res, result, 201, req.originalUrl);
  } catch (err: any) {
    return res.status(500).type("application/problem+json").json({
      type: "https://codeclovers.dev/errors/500",
      title: "Internal Server Error",
      status: 500,
      detail: err?.message || "Failed to create FAQ",
      instance: req.originalUrl,
      timestamp: new Date().toISOString(),
    });
  }
}

export async function patchFaq(req: Request, res: Response) {
  try {
    const id = getParamId(req);
    const result = await updateFaq(id, req.body);
    return handleServiceResult(res, result, 200, req.originalUrl);
  } catch (err: any) {
    return res.status(500).type("application/problem+json").json({
      type: "https://codeclovers.dev/errors/500",
      title: "Internal Server Error",
      status: 500,
      detail: err?.message || "Failed to update FAQ",
      instance: req.originalUrl,
      timestamp: new Date().toISOString(),
    });
  }
}

export async function removeFaq(req: Request, res: Response) {
  try {
    const id = getParamId(req);
    const result = await deleteFaq(id);
    return handleServiceResult(res, result, 200, req.originalUrl);
  } catch (err: any) {
    return res.status(500).type("application/problem+json").json({
      type: "https://codeclovers.dev/errors/500",
      title: "Internal Server Error",
      status: 500,
      detail: err?.message || "Failed to delete FAQ",
      instance: req.originalUrl,
      timestamp: new Date().toISOString(),
    });
  }
}
