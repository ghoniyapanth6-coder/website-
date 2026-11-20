import { NextRequest } from "next/server";
import { getAgencySettings, updateAgencySettings } from "@/lib/api/services";
import { jsonSuccess, jsonProblem } from "@/lib/api/response";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const result = await getAgencySettings();
    return jsonSuccess(result.data, { source: result.source });
  } catch (error: any) {
    return jsonProblem({
      status: 500,
      title: "Internal Server Error",
      detail: error?.message || "Failed to retrieve agency settings.",
      instance: "/api/settings",
    });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);

    if (!body || typeof body !== "object") {
      return jsonProblem({
        status: 400,
        title: "Bad Request",
        detail: "Request body must be a valid JSON object.",
        instance: "/api/settings",
      });
    }

    const result = await updateAgencySettings(body);
    return jsonSuccess(result.data, { source: result.source });
  } catch (error: any) {
    return jsonProblem({
      status: 500,
      title: "Internal Server Error",
      detail: error?.message || "Failed to update agency settings.",
      instance: "/api/settings",
    });
  }
}
