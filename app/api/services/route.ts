import { NextResponse } from "next/server";
import { getServicesFromFile, saveServicesToFile } from "@/lib/servicesStore";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const all = searchParams.get("all") === "true";

    const list = getServicesFromFile();
    const data = all ? list : list.filter((s: any) => s.active !== false);

    return NextResponse.json(
      { success: true, count: data.length, data },
      { headers: { "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0" } }
    );
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const list = getServicesFromFile();
    const updated = [body, ...list];
    saveServicesToFile(updated);

    return NextResponse.json(
      { success: true, data: body },
      { headers: { "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0" } }
    );
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
