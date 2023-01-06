import { motion } from "framer-motion";

export default function Support() {
  return (
    <>
      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          delay: 0.1,
          duration: 0.3,
        }}
        className="text-zinc-800 text-5xl md:text-7xl font-bold px-4 overflow-hidden"
      >
        Support - FAQ
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          delay: 0.15,
          duration: 0.3,
        }}
        className="text-zinc-700 text-base md:text-xl font-medium max-w-xl mx-6 text-center"
      >
        We are dedicated to resolving your issues as soon as possible.
      </motion.p>
    </>
  );
}
