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

export async function GET() {
  try {
    await dbConnect();
    const pages = await PageContent.find();
    return NextResponse.json({ success: true, count: pages.length, data: pages });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
