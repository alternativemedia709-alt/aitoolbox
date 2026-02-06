type OrgSiteSchemaProps = {
  siteUrl: string;
  siteName: string;
  logoUrl?: string;
};

export function OrganizationWebSiteSchema({
  siteUrl,
  siteName,
  logoUrl,
}: OrgSiteSchemaProps) {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: siteUrl,
    ...(logoUrl ? { logo: logoUrl } : {}),
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: siteUrl,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}

type SoftwareApplicationSchemaProps = {
  name: string;
  description: string;
  url: string;
  applicationCategory?: string;
  operatingSystem?: string;
};

export function SoftwareApplicationSchema({
  name,
  description,
  url,
  applicationCategory = "MultimediaApplication",
  operatingSystem = "Web",
}: SoftwareApplicationSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    description,
    url,
    applicationCategory,
    operatingSystem,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

type BlogPostingSchemaProps = {
  headline: string;
  description?: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
  authorName?: string;
  imageUrl?: string;
};

export function BlogPostingSchema({
  headline,
  description,
  url,
  datePublished,
  dateModified,
  authorName,
  imageUrl,
}: BlogPostingSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline,
    description,
    url,
    datePublished,
    dateModified,
    author: authorName
      ? {
          "@type": "Person",
          name: authorName,
        }
      : undefined,
    image: imageUrl ? [imageUrl] : undefined,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
