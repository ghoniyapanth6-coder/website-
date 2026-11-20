import { NextResponse } from "next/server";
import { RFC7807Problem, ApiResponse } from "./types";

/**
 * Creates an RFC 7807 compliant Problem Details object.
 */
export function createProblemDetails(params: {
  status: number;
  title: string;
  detail: string;
  type?: string;
  instance?: string;
  invalidParams?: Array<{ name: string; reason: string }>;
  code?: string;
}): RFC7807Problem {
  return {
    type: params.type || `https://codeclovers.dev/errors/${params.status}`,
    title: params.title,
    status: params.status,
    detail: params.detail,
    instance: params.instance,
    invalidParams: params.invalidParams,
    code: params.code,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Returns a Next.js NextResponse with an RFC 7807 Problem Details body.
 */
export function jsonProblem(
  params: {
    status: number;
    title: string;
    detail: string;
    type?: string;
    instance?: string;
    invalidParams?: Array<{ name: string; reason: string }>;
    code?: string;
  },
  headers?: Record<string, string>
) {
  const problem = createProblemDetails(params);
  return NextResponse.json(problem, {
    status: params.status,
    headers: {
      "Content-Type": "application/problem+json; charset=utf-8",
      ...headers,
    },
  });
}

/**
 * Returns a Next.js NextResponse for successful API queries.
 */
export function jsonSuccess<T>(
  data: T,
  options?: {
    status?: number;
    source?: "mongodb" | "mock-fallback";
    meta?: {
      total?: number;
      page?: number;
      limit?: number;
      pages?: number;
      [key: string]: unknown;
    };
    headers?: Record<string, string>;
  }
) {
  const { status = 200, source = "mongodb", meta, headers } = options || {};
  const body: ApiResponse<T> = {
    success: true,
    source,
    data,
    ...(meta ? { meta } : {}),
    timestamp: new Date().toISOString(),
  };

  return NextResponse.json(body, {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...headers,
    },
  });
}
