import { seedAllCollections } from "@/lib/api/services";
import { jsonSuccess, jsonProblem } from "@/lib/api/response";

export const dynamic = "force-dynamic";

export async function POST() {
  try {
    const result = await seedAllCollections();
    return jsonSuccess(result.data, {
      source: result.source,
      status: 200,
    });
  } catch (error: any) {
    return jsonProblem({
      status: 500,
      title: "Internal Server Error",
      detail: error?.message || "Failed to execute database seed.",
      instance: "/api/seed",
    });
  }
}
