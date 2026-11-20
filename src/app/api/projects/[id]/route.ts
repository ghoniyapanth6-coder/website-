import { NextRequest } from "next/server";
import { getProjectById, updateProject, deleteProject } from "@/lib/api/services";
import { jsonSuccess, jsonProblem } from "@/lib/api/response";

export const dynamic = "force-dynamic";

interface RouteContext {
  params: { id: string };
}

export async function GET(_request: NextRequest, { params }: RouteContext) {
  try {
    const { id } = params;
    const result = await getProjectById(id);

    if (result.error) {
      return jsonProblem({
        status: result.error.status,
        title: result.error.title,
        detail: result.error.detail,
        instance: `/api/projects/${id}`,
      });
    }

    return jsonSuccess(result.data, { source: result.source });
  } catch (error: any) {
    return jsonProblem({
      status: 500,
      title: "Internal Server Error",
      detail: error?.message || "Failed to retrieve project.",
      instance: `/api/projects/${params.id}`,
    });
  }
}

export async function PATCH(request: NextRequest, { params }: RouteContext) {
  try {
    const { id } = params;
    const body = await request.json().catch(() => null);

    if (!body || typeof body !== "object") {
      return jsonProblem({
        status: 400,
        title: "Bad Request",
        detail: "Request body must be a valid JSON object.",
        instance: `/api/projects/${id}`,
      });
    }

    const result = await updateProject(id, body);

    if (result.error) {
      return jsonProblem({
        status: result.error.status,
        title: result.error.title,
        detail: result.error.detail,
        instance: `/api/projects/${id}`,
      });
    }

    return jsonSuccess(result.data, { source: result.source });
  } catch (error: any) {
    return jsonProblem({
      status: 500,
      title: "Internal Server Error",
      detail: error?.message || "Failed to update project.",
      instance: `/api/projects/${params.id}`,
    });
  }
}

export async function DELETE(_request: NextRequest, { params }: RouteContext) {
  try {
    const { id } = params;
    const result = await deleteProject(id);

    if (result.error) {
      return jsonProblem({
        status: result.error.status,
        title: result.error.title,
        detail: result.error.detail,
        instance: `/api/projects/${id}`,
      });
    }

    return jsonSuccess(result.data, { source: result.source });
  } catch (error: any) {
    return jsonProblem({
      status: 500,
      title: "Internal Server Error",
      detail: error?.message || "Failed to delete project.",
      instance: `/api/projects/${params.id}`,
    });
  }
}
