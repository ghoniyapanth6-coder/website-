import { NextRequest } from "next/server";
import { getTestimonialById, updateTestimonial, deleteTestimonial } from "@/lib/api/services";
import { jsonSuccess, jsonProblem } from "@/lib/api/response";

export const dynamic = "force-dynamic";

interface RouteContext {
  params: { id: string };
}

export async function GET(_request: NextRequest, { params }: RouteContext) {
  try {
    const { id } = params;
    const result = await getTestimonialById(id);

    if (result.error) {
      return jsonProblem({
        status: result.error.status,
        title: result.error.title,
        detail: result.error.detail,
        instance: `/api/testimonials/${id}`,
      });
    }

    return jsonSuccess(result.data, { source: result.source });
  } catch (error: any) {
    return jsonProblem({
      status: 500,
      title: "Internal Server Error",
      detail: error?.message || "Failed to retrieve testimonial.",
      instance: `/api/testimonials/${params.id}`,
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
        instance: `/api/testimonials/${id}`,
      });
    }

    const result = await updateTestimonial(id, body);

    if (result.error) {
      return jsonProblem({
        status: result.error.status,
        title: result.error.title,
        detail: result.error.detail,
        instance: `/api/testimonials/${id}`,
      });
    }

    return jsonSuccess(result.data, { source: result.source });
  } catch (error: any) {
    return jsonProblem({
      status: 500,
      title: "Internal Server Error",
      detail: error?.message || "Failed to update testimonial.",
      instance: `/api/testimonials/${params.id}`,
    });
  }
}

export async function DELETE(_request: NextRequest, { params }: RouteContext) {
  try {
    const { id } = params;
    const result = await deleteTestimonial(id);

    if (result.error) {
      return jsonProblem({
        status: result.error.status,
        title: result.error.title,
        detail: result.error.detail,
        instance: `/api/testimonials/${id}`,
      });
    }

    return jsonSuccess(result.data, { source: result.source });
  } catch (error: any) {
    return jsonProblem({
      status: 500,
      title: "Internal Server Error",
      detail: error?.message || "Failed to delete testimonial.",
      instance: `/api/testimonials/${params.id}`,
    });
  }
}
