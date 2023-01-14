import Head from "next/head";

export default function SEO({
  title,
  description,
  image,
  url,
}: {
  title: string;
  description: string;
  image: string;
  url: string;
}) {
  return (
    <Head>
      {/* titles */}
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta name="twitter:title" content={title} />

      {/* keywords */}
      <meta
        name="keywords"
        content="AI, Text identification, Machine learning, Natural language processing, Extension, Browser, Meta tags, Text analysis, Data analysis, Automated text analysis, Text recognition, Content analysis, Text mining, Text categorization, AI text identifier, AI text detection, Text analysis tool, NLP tool, Text categorization tool"
      />

      {/* descriptions */}
      <meta name="description" content={description} />
      <meta property="og:description" content={description} />
      <meta name="twitter:description" content={description} />

      {/* images */}
      <meta property="og:image" content={image} />
      <meta name="twitter:image" content={image} />

      {/* other og */}
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />

      {/* other twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@InspectGPT" />

      {/* other meta and files */}
      <link rel="manifest" href="/favicon/site.webmanifest" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#333333" />
      <meta name="msapplication-TileColor" content="#2b5797" />

      {/* favicons */}
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicon/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon/favicon-16x16.png"
      />
      <link
        rel="mask-icon"
        href="/favicon/safari-pinned-tab.svg"
        color="#333333"
      />
    </Head>
  );
}
