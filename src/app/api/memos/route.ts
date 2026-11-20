import { NextRequest } from "next/server";
import { listMemos, createMemo } from "@/lib/api/services";
import { jsonSuccess, jsonProblem } from "@/lib/api/response";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") || undefined;
    const search = searchParams.get("search") || searchParams.get("q") || undefined;
    const status = searchParams.get("status") || undefined;
    const publishedOnly = searchParams.get("publishedOnly") === "true";
    const page = searchParams.get("page") ? parseInt(searchParams.get("page")!, 10) : 1;
    const limit = searchParams.get("limit") ? parseInt(searchParams.get("limit")!, 10) : 20;

    const result = await listMemos({ category, search, status, publishedOnly, page, limit });

    return jsonSuccess(result.data, {
      source: result.source,
      meta: result.meta,
    });
  } catch (error: any) {
    return jsonProblem({
      status: 500,
      title: "Internal Server Error",
      detail: error?.message || "Failed to retrieve journal memos.",
      instance: "/api/memos",
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
        instance: "/api/memos",
      });
    }

    const result = await createMemo(body);

    if (result.error) {
      return jsonProblem({
        status: result.error.status,
        title: result.error.title,
        detail: result.error.detail,
        invalidParams: result.error.invalidParams,
        instance: "/api/memos",
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
      detail: error?.message || "Failed to create memo.",
      instance: "/api/memos",
    });
  }
}
