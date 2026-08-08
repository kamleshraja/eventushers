import fs from "fs";
import path from "path";
import { servicesData } from "@/data/servicesData";

const OVERRIDE_FILE_PATH = path.join(process.cwd(), "data", "services_override.json");

export function getServicesFromFile(): any[] {
  try {
    if (fs.existsSync(OVERRIDE_FILE_PATH)) {
      const content = fs.readFileSync(OVERRIDE_FILE_PATH, "utf-8");
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Merge overrides over default servicesData so no properties are missing
        const mergedDefaults = servicesData.map((defaultSvc) => {
          const override = parsed.find((o) => o.id === defaultSvc.id || o.slug === defaultSvc.slug);
          return override ? { ...defaultSvc, ...override } : defaultSvc;
        });
        // Include any new custom services created in admin panel that aren't in servicesData
        const newCustomServices = parsed.filter(
          (o) => !servicesData.some((defaultSvc) => defaultSvc.id === o.id || defaultSvc.slug === o.slug)
        );
        return [...mergedDefaults, ...newCustomServices];
      }
    }
  } catch (e) {
    console.error("Failed to read services_override.json", e);
  }
  return servicesData;
}

export function saveServicesToFile(services: any[]) {
  try {
    const dir = path.dirname(OVERRIDE_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(OVERRIDE_FILE_PATH, JSON.stringify(services, null, 2), "utf-8");
  } catch (e) {
    console.error("Failed to write services_override.json", e);
  }
}
