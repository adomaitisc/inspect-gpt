import { motion } from "framer-motion";
import Image from "next/image";
import twitter from "../public/icons/twitter.svg";

export default function Text() {
  return (
    <>
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
      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          delay: 0.2,
          duration: 0.3,
        }}
        className="text-white/90 text-base mt-4 md:text-2xl font-light max-w-xl mx-6 text-center"
      >
        Don't let AI fool you.
      </motion.h1>
    </>
  );
}
