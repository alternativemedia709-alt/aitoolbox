import os

import requests
from redis import Redis
from rq import Connection, Queue, Worker

REDIS_URL = os.getenv("REDIS_URL", "redis://redis:6379/0")
JOB_QUEUE = os.getenv("JOB_QUEUE", "JOB_QUEUE")
FLUX_API_URL = os.getenv("FLUX_API_URL", "http://flux-api:8000")


def image_generate(prompt: str) -> dict:
    response = requests.post(
        f"{FLUX_API_URL}/generate",
        json={"prompt": prompt},
        timeout=120,
    )
    response.raise_for_status()
    return response.json()


def main() -> None:
    conn = Redis.from_url(REDIS_URL)
    with Connection(conn):
        queue = Queue(JOB_QUEUE)
        worker = Worker([queue])
        worker.work()


if __name__ == "__main__":
    main()
