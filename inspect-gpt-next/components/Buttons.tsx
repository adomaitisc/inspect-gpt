import { motion } from "framer-motion";
import Image from "next/image";
import chrome from "../public/icons/chrome.svg";
import github from "../public/icons/github.svg";

export default function Buttons() {
  return (
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
  );
}
