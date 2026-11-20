import { Request, Response } from "express";
import { ServiceResult } from "../../src/lib/api/services";

export function getParamId(req: Request, paramName = "id"): string {
  const val = req.params[paramName];
  return Array.isArray(val) ? val[0] : (val || "");
}

export function handleServiceResult<T>(
  res: Response,
  result: ServiceResult<T>,
  successStatus = 200,
  instancePath?: string
) {
  if (result.error) {
    return res.status(result.error.status).type("application/problem+json").json({
      type: `https://codeclovers.dev/errors/${result.error.status}`,
      title: result.error.title,
      status: result.error.status,
      detail: result.error.detail,
      instance: instancePath,
      invalidParams: result.error.invalidParams,
      timestamp: new Date().toISOString(),
    });
  }

  return res.status(successStatus).json({
    success: true,
    source: result.source,
    data: result.data,
    ...(result.meta ? { meta: result.meta } : {}),
    timestamp: new Date().toISOString(),
  });
}
