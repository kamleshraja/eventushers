import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import mongoose from "mongoose";

const PageContentSchema = new mongoose.Schema(
  {
    pageKey: { type: String, required: true, unique: true },
    pageTitle: { type: String, required: true },
    path: { type: String, required: true },
    heroHeadline: { type: String, default: "" },
    heroSubheading: { type: String, default: "" },
    metaTitle: { type: String, default: "" },
    metaDescription: { type: String, default: "" },
    customContent: { type: Map, of: String, default: {} },
  },
  { timestamps: true }
);

const PageContent = mongoose.models.PageContent || mongoose.model("PageContent", PageContentSchema);

export async function GET(req: Request, { params }: { params: { key: string } }) {
  try {
    await dbConnect();
    const page = await PageContent.findOne({ pageKey: params.key });
    return NextResponse.json({ success: true, data: page || null });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { key: string } }) {
  try {
    await dbConnect();
    const body = await req.json();
    const { pageTitle, path, heroHeadline, heroSubheading, metaTitle, metaDescription, customContent } = body;

    const updatedPage = await PageContent.findOneAndUpdate(
      { pageKey: params.key },
      {
        pageKey: params.key,
        pageTitle: pageTitle || params.key,
        path: path || `/${params.key === "home" ? "" : params.key}`,
        heroHeadline,
        heroSubheading,
        metaTitle,
        metaDescription,
        customContent,
      },
      { new: true, upsert: true, runValidators: true }
    );

    return NextResponse.json({ success: true, message: `Page '${params.key}' updated successfully`, data: updatedPage });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
