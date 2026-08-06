import { NextResponse } from "next/server";

export async function GET() {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
    const res = await fetch(`${backendUrl}/health`, { cache: "no-store" }).catch(() => null);
    if (res && res.ok) {
      const data = await res.json();
      return NextResponse.json({
        status: "ok",
        service: "Event Ushers Next.js App Router API",
        backend: data,
        timestamp: new Date(),
      });
    }
    return NextResponse.json({
      status: "ok",
      service: "Event Ushers Next.js App Router",
      backend: "Offline / Standalone mode",
      timestamp: new Date(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { status: "error", message: error.message },
      { status: 500 }
    );
  }
}
