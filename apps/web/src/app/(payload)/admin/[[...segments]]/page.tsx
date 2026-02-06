/* eslint-disable @typescript-eslint/no-explicit-any */
import { generatePageMetadata, RootPage } from "@payloadcms/next/views";

import config from "../../../../../payload.config";
import { importMap } from "../../../../../payload-import-map";

export const dynamic = "force-dynamic";

export const generateMetadata = ({ params, searchParams }: any) =>
  generatePageMetadata({
    config: Promise.resolve(config),
    params: Promise.resolve(params),
    searchParams: Promise.resolve(searchParams ?? {}),
  });

export default function AdminPage({ params, searchParams }: any) {
  return (
    <RootPage
      config={Promise.resolve(config)}
      importMap={importMap}
      params={Promise.resolve(params)}
      searchParams={Promise.resolve(searchParams ?? {})}
    />
  );
}
