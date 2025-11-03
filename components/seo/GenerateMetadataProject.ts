export function GenerateMetadataProject(data: any, slug: string) {
  const title = data?.title || "Dự án";
  const description =
    data?.introduce?.content_one ||
    "FOSO cung cấp giải pháp công nghệ giúp doanh nghiệp tối ưu vận hành, từ giải pháp phần mềm đến thiết kế app mobile và website theo yêu cầu.";
  const keywords =
    data?.seo_keywords ||
    "FOSO, thiết kế website, phát triển phần mềm, công nghệ cho SME";

  const baseUrl = process.env.NEXT_PUBLIC_URL_WEBSITE || "https://fososoft.com";

  const canonicalUrl = `${slug}`;

  const image = data?.image?.startsWith("http")
    ? data?.image
    : `${baseUrl}${data?.image || "/opengraph-image.png"}`;

  return {
    title,
    description,
    keywords,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "vi-VN": "/vi",
        "en-US": "/en",
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "FOSO",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: "FOSO Logo",
        },
      ],
      locale: "vi_VN",
      type: "article",
    },
    twitter: {
      title,
      description,
      card: "summary_large_image",
      site: "@foso",
      creator: "@foso",
      images: [
        {
          url: image,
          alt: "FOSO Logo",
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
      },
    },
    other: {
      keywords,
      googlebot:
        "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
    },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any", type: "image/x-icon" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      ],
      shortcut: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },
    // viewport: {
    //     width: 'device-width',
    //     initialScale: 1,
    //     maximumScale: 5,
    // },
    category: "technology",
    applicationName: "FOSO",
    generator: "Next.js 15",
  };
}
