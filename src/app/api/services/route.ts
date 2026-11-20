import { NextRequest } from "next/server";
import { listServices, createService } from "@/lib/api/services";
import { jsonSuccess, jsonProblem } from "@/lib/api/response";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") || undefined;
    const status = searchParams.get("status") || undefined;

    const result = await listServices({ category, status });
    return jsonSuccess(result.data, {
      source: result.source,
      meta: result.meta,
    });
  } catch (error: any) {
    return jsonProblem({
      status: 500,
      title: "Internal Server Error",
      detail: error?.message || "Failed to retrieve services.",
      instance: "/api/services",
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);

    if (!body || typeof body !== "object") {
      return jsonProblem({
        status: 400,
        title: "Bad Request",
        detail: "Request body must be a valid JSON object.",
        instance: "/api/services",
      });
    }

    const result = await createService(body);

    if (result.error) {
      return jsonProblem({
        status: result.error.status,
        title: result.error.title,
        detail: result.error.detail,
        invalidParams: result.error.invalidParams,
        instance: "/api/services",
      });
    }

    return jsonSuccess(result.data, {
      status: 201,
      source: result.source,
    });
  } catch (error: any) {
    return jsonProblem({
      status: 500,
      title: "Internal Server Error",
      detail: error?.message || "Failed to create service.",
      instance: "/api/services",
    });
  }
}
