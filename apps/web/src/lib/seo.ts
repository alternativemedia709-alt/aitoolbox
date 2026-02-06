type OpenGraphInput = {
  title: string;
  description?: string;
  url: string;
  images?: Array<{ url: string; width?: number; height?: number; alt?: string }>;
  type?: "website" | "article";
};

type TwitterInput = {
  title: string;
  description?: string;
  images?: string[];
};

export function buildCanonical(url: string) {
  return { canonical: url };
}

export function buildOpenGraph({
  title,
  description,
  url,
  images,
  type = "website",
}: OpenGraphInput) {
  return {
    title,
    description,
    url,
    type,
    images,
  };
}

export function buildTwitter({ title, description, images }: TwitterInput) {
  return {
    card: images && images.length > 0 ? "summary_large_image" : "summary",
    title,
    description,
    images,
  };
}
