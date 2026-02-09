const baseUrl =
  process.env.NEXT_PUBLIC_APP_URL ?? "https://megareform.com";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Mega Reform",
  url: baseUrl,
  description:
    "Meditasyon, yoga, tarot ve ruhsal gelisim icin uzman rehberlik platformu.",
  locale: "tr_TR",
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Mega Reform",
  url: baseUrl,
  description:
    "Ruhsal gelisim platformu. Uzman rehberler, makaleler, kurslar ve videolar.",
  inLanguage: "tr",
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: `${baseUrl}/uzmanlar?q={search_term_string}` },
    "query-input": "required name=search_term_string",
  },
};

export function JsonLdOrganization() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(organizationSchema),
      }}
    />
  );
}

export function JsonLdWebSite() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(websiteSchema),
      }}
    />
  );
}
