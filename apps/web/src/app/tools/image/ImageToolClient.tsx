"use client";

import { useState } from "react";

type ImageResponse = {
  image?: {
    url?: string;
    data?: string;
    mime?: string;
  };
  url?: string;
  data?: string;
  message?: string;
};

export function ImageToolClient() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<ImageResponse | null>(null);

  const imageUrl = response?.image?.url ?? response?.url ?? null;
  const imageData = response?.image?.data ?? response?.data ?? null;
  const imageMime = response?.image?.mime ?? "image/png";
  const dataUrl = imageData ? `data:${imageMime};base64,${imageData}` : null;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await fetch("/api/generate/image", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        const payload = await res.json().catch(() => ({}));
        throw new Error(payload.error ?? "Request failed");
      }

      const data = (await res.json()) as ImageResponse;
      setResponse(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto w-full max-w-3xl space-y-8">
        <header className="space-y-2">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Tools
          </p>
          <h1 className="text-3xl font-semibold">Image Generator</h1>
          <p className="text-sm text-muted-foreground">
            Generate an image using the offline FLUX model.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-sm font-medium" htmlFor="prompt">
            Prompt
          </label>
          <textarea
            id="prompt"
            className="min-h-[120px] w-full rounded-md border border-border bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            placeholder="A calm sunrise over the Rhodope mountains..."
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity disabled:opacity-60"
          >
            {loading ? "Generating..." : "Generate image"}
          </button>
        </form>

        {error && (
          <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {(imageUrl || dataUrl) && (
          <div className="space-y-3">
            <h2 className="text-lg font-semibold">Preview</h2>
            <div className="overflow-hidden rounded-lg border border-border">
              <img
                src={imageUrl ?? dataUrl ?? ""}
                alt="Generated preview"
                className="h-auto w-full object-cover"
              />
            </div>
          </div>
        )}

        {response && (
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Raw response</h2>
            <pre className="max-h-[320px] overflow-auto rounded-lg border border-border bg-muted/40 p-4 text-xs">
              {JSON.stringify(response, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </main>
  );
}
