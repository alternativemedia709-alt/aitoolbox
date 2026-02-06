import { NextResponse } from "next/server";
import { z } from "zod";

import { rateLimit } from "@/lib/rate-limit";

const payloadSchema = z.object({
  prompt: z.string().min(1),
});

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = payloadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const limit = Number(process.env.RATE_LIMIT_MAX ?? 10);
  const windowSeconds = Number(process.env.RATE_LIMIT_WINDOW ?? 60);
  const ip = request.headers.get("x-forwarded-for") ?? "unknown";
  const rl = await rateLimit(`image:${ip}`, limit, windowSeconds);
  if (!rl.allowed) {
    return NextResponse.json(
      { error: "Rate limit exceeded" },
      { status: 429, headers: { "Retry-After": String(rl.resetSeconds) } }
    );
  }

  const fluxUrl = process.env.FLUX_API_URL ?? "http://flux-api:8000";
  const response = await fetch(`${fluxUrl}/generate`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ prompt: parsed.data.prompt }),
    cache: "no-store",
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: "Flux API error" },
      { status: 502 }
    );
  }

  const data = await response.json();
  return NextResponse.json(data);
}
