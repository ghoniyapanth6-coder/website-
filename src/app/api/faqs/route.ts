import { NextRequest } from "next/server";
import { listFaqs, createFaq } from "@/lib/api/services";
import { jsonSuccess, jsonProblem } from "@/lib/api/response";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const targetPage = searchParams.get("targetPage") || searchParams.get("page") || undefined;
    const category = searchParams.get("category") || undefined;
    const search = searchParams.get("search") || searchParams.get("q") || undefined;

    const result = await listFaqs({ targetPage, category, search });
    return jsonSuccess(result.data, {
      source: result.source,
      meta: result.meta,
    });
  } catch (error: any) {
    return jsonProblem({
      status: 500,
      title: "Internal Server Error",
      detail: error?.message || "Failed to retrieve FAQs.",
      instance: "/api/faqs",
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
        instance: "/api/faqs",
      });
    }

    const result = await createFaq(body);

    if (result.error) {
      return jsonProblem({
        status: result.error.status,
        title: result.error.title,
        detail: result.error.detail,
        invalidParams: result.error.invalidParams,
        instance: "/api/faqs",
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
      detail: error?.message || "Failed to create FAQ.",
      instance: "/api/faqs",
    });
  }
}
