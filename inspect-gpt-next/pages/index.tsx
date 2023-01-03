import { motion } from "framer-motion";

import Head from "next/head";
import Image from "next/image";

import noise from "../public/noise.svg";
import logo from "../public/inspect-gpt.svg";
import extension from "../public/extension.svg";
import chrome from "../public/chrome.png";

export default function Home() {
  return (
    <>
      <div
        id="blob-one"
        className="absolute top-0 left-0 h-96 w-96 bg-purple-300 rounded-full blur-[128px] -z-10"
      />
      <div
        id="blob-two"
        className="absolute bottom-0 right-0 h-96 w-96 bg-blue-300 rounded-full blur-[128px] -z-10"
      />
      <Image
        src={noise}
        alt={""}
        quality={100}
        className="fixed h-screen w-screen -z-10 invert object-cover opacity-40"
      />
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="w-full h-full flex flex-col items-center">
        <header className="w-full px-32 py-6">
          <Image src={logo} alt={""} />
        </header>
        <section className="flex flex-col gap-10 py-20 items-center">
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.3 }}
            className="text-white text-5xl md:text-7xl font-bold"
          >
            InspectGPT
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.3 }}
            className="text-white/80 text-base md:text-xl font-medium max-w-xl mx-6 text-center"
          >
            Our extension makes it simple to find GPT-generated text on any web
            page. Just install it and let it scan the page for you.
          </motion.p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-8">
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.3 }}
              className="flex gap-2 items-center justify-center bg-zinc-900 text-white text-lg font-semibold rounded-2xl px-6 py-1.5 shadow-sm hover:bg-gpt-400 hover:rounded-xl"
            >
              <Image src={chrome} alt={"chrome logo"} height={20} />
              Install Extension
            </motion.button>
            <motion.a
              href="https://github.com/adomaitisc/inspect-gpt"
              rel="noreferrer"
              target="_blank"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.3 }}
              className="text-white text-lg font-semibold px-6 py-1.5 hover:text-zinc-300/40"
            >
              Star on Github
            </motion.a>
          </div>
        </section>
        <motion.div
          initial={{ opacity: 0, y: 100, rotateZ: 10, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, rotateZ: 0, scale: 1 }}
          transition={{ delay: 2, duration: 0.3 }}
          className="pb-20 md:pb-36 w-full max-w-md px-6"
        >
          <Image
            src={extension}
            alt={""}
            className="w-full rounded-[10px] shadow-md border border-zinc-500/50"
          />
        </motion.div>
        <footer className="py-12 flex flex-col items-center">
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
