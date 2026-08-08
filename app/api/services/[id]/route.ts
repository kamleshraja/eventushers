import { NextResponse } from "next/server";
import { getServicesFromFile, saveServicesToFile } from "@/lib/servicesStore";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const list = getServicesFromFile();
    const service = list.find((s: any) => s.id === params.id || s.slug === params.id);
    if (!service) {
      return NextResponse.json({ success: false, message: "Service not found" }, { status: 404 });
    }
    return NextResponse.json(
      { success: true, data: service },
      { headers: { "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0" } }
    );
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const list = getServicesFromFile();
    const index = list.findIndex((s: any) => s.id === params.id || s.slug === params.id);
    let updatedList: any[];
    if (index !== -1) {
      updatedList = list.map((s: any, i: number) =>
        i === index ? { ...s, ...body } : s
      );
    } else {
      updatedList = [{ ...body, id: params.id }, ...list];
    }
    saveServicesToFile(updatedList);
    return NextResponse.json(
      { success: true, data: body },
      { headers: { "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0" } }
    );
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const list = getServicesFromFile();
    const updatedList = list.filter((s: any) => s.id !== params.id && s.slug !== params.id);
    saveServicesToFile(updatedList);
    return NextResponse.json(
      { success: true, message: "Service deleted" },
      { headers: { "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0" } }
    );
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
