import React from "react";
import { blogArticles } from "@/data/blogData";
import { BlogDetailClient } from "./BlogDetailClient";

export function generateStaticParams() {
  const params: { id: string }[] = [];
  blogArticles.forEach((article) => {
    params.push({ id: article.id.toString() });
    params.push({ id: article.slug });
  });
  return params;
}

export default function BlogDetailPage({ params }: { params: { id: string } }) {
  return <BlogDetailClient articleId={params.id} />;
}
