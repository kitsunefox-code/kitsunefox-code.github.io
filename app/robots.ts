import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/site";

// output: export（静的書き出し）で生成するために必要
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
