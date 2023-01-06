import { motion } from "framer-motion";
import Image from "next/image";
import twitter from "../public/icons/twitter.svg";

export default function Text() {
  return (
    <>
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
        Launching InspectGPT!
      </motion.a>
      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          delay: 0.15,
          duration: 0.3,
        }}
        className="text-white text-5xl md:text-7xl font-bold px-4 overflow-hidden"
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
    </>
  );
}
