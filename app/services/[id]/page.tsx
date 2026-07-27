import React from "react";
import { servicesData } from "@/data/servicesData";
import { ServiceDetailContent } from "@/components/ServiceDetailContent";

export function generateStaticParams() {
  return servicesData.map((service) => ({
    id: service.id,
  }));
}

export default function ServiceDetailPage({ params }: { params: { id: string } }) {
  return <ServiceDetailContent serviceId={params.id} />;
}
