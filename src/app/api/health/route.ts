import { NextResponse } from "next/server";
import { getHealthStatus } from "@/lib/api/services";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const health = await getHealthStatus();
    return NextResponse.json(health, {
      status: 200,
      headers: {
        "Cache-Control": "no-store, max-age=0",
        "Content-Type": "application/json; charset=utf-8",
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        status: "error",
        detail: error?.message || "Health check failed",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
