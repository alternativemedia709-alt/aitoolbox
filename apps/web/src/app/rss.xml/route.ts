const siteUrl = process.env.NEXT_PUBLIC_SERVER_URL ?? "http://localhost";

export async function GET() {
  const now = new Date().toUTCString();
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>aitoolbox</title>
    <link>${siteUrl}</link>
    <description>aitoolbox blog feed</description>
    <lastBuildDate>${now}</lastBuildDate>
  </channel>
</rss>`;

  return new Response(body, {
    headers: {
      "content-type": "application/rss+xml; charset=utf-8",
    },
  });
}
