import { motion } from "framer-motion";
import Image from "next/image";
import twitter from "../public/icons/twitter.svg";

export default function Text() {
  return (
    <>
      {/* <motion.a
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          delay: 0.1,
          duration: 0.3,
        }}
        style={{ transition: "background-color 0.3s ease, color 0.3s ease" }}
        className="flex items-center justify-center gap-2 bg-sky-400/60 px-6 py-2 rounded-2xl font-bold text-white cursor-pointer hover:bg-sky-400/20 hover:text-white/40 group "
      >
        <Image
          src={twitter}
          className="group-hover:opacity-40 duration-300"
          alt={"twitter logo"}
          height={20}
        />
        Launching InspectGPT!
      </motion.a> */}
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
        With just one click, our extension analyzes the webpage you're viewing
        and gives you valuable insights.
      </motion.p>
    </>
  );
}
