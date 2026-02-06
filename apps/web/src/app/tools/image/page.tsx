import type { Metadata } from "next";

import { buildCanonical, buildOpenGraph, buildTwitter } from "@/lib/seo";
import { SoftwareApplicationSchema } from "@/components/SeoJsonLd";

import { ImageToolClient } from "./ImageToolClient";

const siteUrl = process.env.NEXT_PUBLIC_SERVER_URL ?? "http://localhost";
const pageUrl = `${siteUrl}/tools/image`;

export const generateMetadata = (): Metadata => {
  const title = "Image Generator";
  const description = "Generate an image using the offline FLUX model.";

  return {
    title,
    description,
    alternates: buildCanonical(pageUrl),
    openGraph: buildOpenGraph({
      title,
      description,
      url: pageUrl,
      type: "website",
    }),
    twitter: buildTwitter({
      title,
      description,
    }),
  };
};

export default function ImageToolPage() {
  return (
    <>
      <SoftwareApplicationSchema
        name="Image Generator"
        description="Generate an image using the offline FLUX model."
        url={pageUrl}
      />
      <ImageToolClient />
    </>
  );
}
