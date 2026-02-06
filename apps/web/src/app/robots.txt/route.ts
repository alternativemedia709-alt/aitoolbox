const siteUrl = process.env.NEXT_PUBLIC_SERVER_URL ?? "http://localhost";

export async function GET() {
  const body = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
    },
  });
}
