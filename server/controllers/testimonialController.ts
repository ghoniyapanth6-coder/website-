import { Request, Response } from "express";
import {
  listTestimonials,
  getTestimonialById,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from "../../src/lib/api/services";
import { handleServiceResult, getParamId } from "./helpers";

export async function getTestimonials(req: Request, res: Response) {
  try {
    const { verified, rating } = req.query;
    const result = await listTestimonials({
      verified: verified !== undefined ? verified === "true" : undefined,
      rating: rating ? parseInt(rating as string, 10) : undefined,
    });
    return handleServiceResult(res, result, 200, req.originalUrl);
  } catch (err: any) {
    return res.status(500).type("application/problem+json").json({
      type: "https://codeclovers.dev/errors/500",
      title: "Internal Server Error",
      status: 500,
      detail: err?.message || "Failed to retrieve testimonials",
      instance: req.originalUrl,
      timestamp: new Date().toISOString(),
    });
  }
}

export async function getTestimonial(req: Request, res: Response) {
  try {
    const id = getParamId(req);
    const result = await getTestimonialById(id);
    return handleServiceResult(res, result, 200, req.originalUrl);
  } catch (err: any) {
    return res.status(500).type("application/problem+json").json({
      type: "https://codeclovers.dev/errors/500",
      title: "Internal Server Error",
      status: 500,
      detail: err?.message || "Failed to retrieve testimonial",
      instance: req.originalUrl,
      timestamp: new Date().toISOString(),
    });
  }
}

export async function postTestimonial(req: Request, res: Response) {
  try {
    const result = await createTestimonial(req.body);
    return handleServiceResult(res, result, 201, req.originalUrl);
  } catch (err: any) {
    return res.status(500).type("application/problem+json").json({
      type: "https://codeclovers.dev/errors/500",
      title: "Internal Server Error",
      status: 500,
      detail: err?.message || "Failed to create testimonial",
      instance: req.originalUrl,
      timestamp: new Date().toISOString(),
    });
  }
}

export async function patchTestimonial(req: Request, res: Response) {
  try {
    const id = getParamId(req);
    const result = await updateTestimonial(id, req.body);
    return handleServiceResult(res, result, 200, req.originalUrl);
  } catch (err: any) {
    return res.status(500).type("application/problem+json").json({
      type: "https://codeclovers.dev/errors/500",
      title: "Internal Server Error",
      status: 500,
      detail: err?.message || "Failed to update testimonial",
      instance: req.originalUrl,
      timestamp: new Date().toISOString(),
    });
  }
}

export async function removeTestimonial(req: Request, res: Response) {
  try {
    const id = getParamId(req);
    const result = await deleteTestimonial(id);
    return handleServiceResult(res, result, 200, req.originalUrl);
  } catch (err: any) {
    return res.status(500).type("application/problem+json").json({
      type: "https://codeclovers.dev/errors/500",
      title: "Internal Server Error",
      status: 500,
      detail: err?.message || "Failed to delete testimonial",
      instance: req.originalUrl,
      timestamp: new Date().toISOString(),
    });
  }
}
