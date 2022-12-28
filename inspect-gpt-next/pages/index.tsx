import Head from "next/head";
import Image from "next/image";

import bg from "../public/background.svg";
import logo from "../public/inspect-gpt.svg";
import chrome from "../public/chrome.png";
import demo from "../public/demo.png";

export default function Home() {
  return (
    <>
      <Image
        src={bg}
        alt="background-image"
        className="fixed top-0 left-0 w-screen -z-10"
      />
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="w-full h-full flex flex-col items-center">
        <header className="w-full h-20 flex justify-between items-center px-32 box-border">
          <Image src={logo} alt={""} />
          <button className="bg-gpt-600 text-gpt-100 text-base font-medium rounded-full px-6 py-2 shadow-sm">
            Sign In
          </button>
        </header>
        <section className="flex flex-col gap-10 py-36 items-center">
          <h1 className="text-gpt-100 text-6xl font-bold">InspectGPT</h1>
          <p className="text-gpt-100/80 text-lg font-medium max-w-lg text-center">
            Easily spot GPT-generated text content on any web page with our
            simple analysis extension.
          </p>
          <div className="flex gap-6">
            <button className="flex items-center bg-gpt-100 text-gpt-500 text-base font-semibold rounded-full px-6 py-2 shadow-sm">
              Get extension
            </button>
            <button className="text-gpt-100 text-base font-medium px-6 py-2 underline">
              Learn more
            </button>
          </div>
        </section>
        <section className="pb-36">
          <Image
            src={demo}
            alt={""}
            className="max-w-4xl border-2 border-white rounded-[1.5rem] shadow-md"
          />
        </section>
        <footer className="py-12">
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://vercel.com?utm_source=sharegpt&amp;utm_campaign=oss"
          >
            <Image
              alt="Vercel Logo"
              src="https://www.datocms-assets.com/31049/1618983297-powered-by-vercel.svg"
              width={178}
              height={100}
            />
          </a>
        </footer>
      </main>
    </>
  );
}
