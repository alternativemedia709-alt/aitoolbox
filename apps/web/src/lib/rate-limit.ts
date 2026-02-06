import { getRedis } from "./redis";

export type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  resetSeconds: number;
};

export async function rateLimit(key: string, limit: number, windowSeconds: number): Promise<RateLimitResult> {
  const redis = getRedis();
  if (!redis) {
    return {
      allowed: true,
      remaining: limit,
      resetSeconds: windowSeconds,
    };
  }
  const now = Math.floor(Date.now() / 1000);
  const windowKey = `rl:${key}:${Math.floor(now / windowSeconds)}`;

  const pipeline = redis.pipeline();
  pipeline.incr(windowKey);
  pipeline.ttl(windowKey);
  pipeline.expire(windowKey, windowSeconds, "NX");
  const results = await pipeline.exec();

  const count = results?.[0]?.[1] as number | undefined;
  const ttl = results?.[1]?.[1] as number | undefined;

  const current = count ?? 0;
  const remaining = Math.max(0, limit - current);

  return {
    allowed: current <= limit,
    remaining,
    resetSeconds: ttl && ttl > 0 ? ttl : windowSeconds,
  };
}
