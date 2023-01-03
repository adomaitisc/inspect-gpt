import Head from "next/head";

export default function SEO() {
  return (
    <Head>
      <title>InspectGPT</title>
      <meta
        name="description"
        content="Identify GPT-generated text on any web page with our advanced extension."
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta property="og:title" content="InspectGPT | Download Extension" />
      <meta
        property="og:description"
        content="Identify GPT-generated text on any web page with our advanced extension."
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://inspectgpt.com/" />
      <meta
        property="og:image"
        content="https://github.com/adomaitisc/inspect-gpt/blob/main/inspect-gpt-next/public/og-image.png?raw=true"
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@CoderRocketFuel" />
      <meta name="twitter:title" content="InspectGPT | Download Extension" />
      <meta
        name="twitter:description"
        content="Identify GPT-generated text on any web page with our advanced extension."
      />
      <meta
        name="twitter:image"
        content="https://github.com/adomaitisc/inspect-gpt/blob/main/inspect-gpt-next/public/og-image.png?raw=true"
      />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}
