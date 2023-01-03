import { motion } from "framer-motion";

import Head from "next/head";
import Image from "next/image";

import noise from "../public/noise.svg";
import logo from "../public/inspect-gpt.svg";

import twitter from "../public/twitter.svg";
import chrome from "../public/chrome.svg";
import github from "../public/github.svg";

import extension from "../public/extension.svg";
import Footer from "./components/Footer";
import Demo from "./components/Demo";

export default function Home() {
  return (
    <div className="w-full overflow-x-hidden">
      <div className="fixed w-full top-0 bottom-0 -z-20">
        <div
          id="blob-one"
          className="absolute top-0 left-0 h-96 w-96 bg-purple-300 rounded-full blur-[128px]"
        />
        <div
          id="blob-two"
          className="absolute bottom-0 right-0 h-96 w-96 bg-blue-300 rounded-full blur-[128px]"
        />
      </div>
      <Image
        src={noise}
        alt={""}
        quality={100}
        className="fixed h-screen w-full -z-10 invert object-cover opacity-60"
      />
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="w-full flex flex-col items-center">
        <header className="w-full px-32 py-6">
          <Image src={logo} alt={""} />
        </header>
        <section className="flex flex-col gap-10 py-20 items-center">
          <motion.a
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.1,
              duration: 0.3,
            }}
            className="flex items-center justify-center gap-2 bg-sky-200/60 px-6 py-2 rounded-2xl font-bold text-white cursor-pointer hover:bg-sky-200/40"
          >
            <Image src={twitter} alt={"twitter logo"} height={20} />
            Introducing InspectGPT!
          </motion.a>
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.15,
              duration: 0.3,
            }}
            className="text-white text-5xl md:text-7xl font-bold"
          >
            InspectGPT
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.2,
              duration: 0.3,
            }}
            className="text-white/80 text-base md:text-xl font-medium max-w-xl mx-6 text-center"
          >
            Our extension makes it simple to find GPT-generated text on any web
            page. Just install it and let it scan the page for you.
          </motion.p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-8">
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.25,
                duration: 0.3,
              }}
              className="flex gap-2 items-center justify-center bg-zinc-900 text-white text-lg font-semibold rounded-2xl px-6 py-1.5 shadow-sm hover:bg-zinc-800"
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
              transition={{
                delay: 0.25,
                duration: 0.3,
              }}
              className="flex gap-2 items-center justify-center text-white text-lg font-semibold px-6 py-1.5 hover:opacity-50"
            >
              <Image src={github} alt={"github logo"} height={26} />
              Star on Github
            </motion.a>
          </div>
        </section>

        <Demo />
        <Footer />
      </main>
    </div>
  );
}
