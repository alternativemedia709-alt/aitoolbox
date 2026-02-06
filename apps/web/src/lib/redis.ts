import Redis from "ioredis";

let client: Redis | null = null;

export function getRedis(): Redis | null {
  const redisUrl = process.env.REDIS_URL;
  if (!redisUrl) {
    return null;
  }

  if (!client) {
    client = new Redis(redisUrl, {
      maxRetriesPerRequest: 2,
    });
  }

  return client;
}
