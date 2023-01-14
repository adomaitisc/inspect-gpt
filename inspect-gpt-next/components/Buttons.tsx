import { motion } from "framer-motion";
import Image from "next/image";
import chrome from "../public/icons/chrome.svg";
import github from "../public/icons/github.svg";

export default function Buttons() {
  return (
    <>
      <div className="flex flex-col mt-12 sm:flex-row items-center justify-center gap-2 sm:gap-8">
        <motion.button
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.6,
            type: "spring",
          }}
          style={{ transition: "background-color 0.3s ease, color 0.3s ease" }}
          className="flex gap-2 items-center justify-center bg-black text-white text-lg font-medium rounded-xl px-6 py-1.5 shadow-sm hover:bg-zinc-900 hover:text-white/40 group"
        >
          <Image
            className="group-hover:opacity-40 duration-300"
            src={chrome}
            alt={"chrome logo"}
            height={20}
          />
          Get Extension
        </motion.button>
        <motion.a
          href="https://github.com/adomaitisc/inspect-gpt"
          rel="noreferrer"
          target="_blank"
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 0.1,
            duration: 0.6,
            type: "spring",
          }}
          style={{ transition: "color 0.3s ease" }}
          className="flex gap-2 items-center justify-center rounded-2xl text-white text-lg font-medium px-6 py-1.5 hover:text-white/40 group"
        >
          <Image
            src={github}
            className="group-hover:opacity-40 duration-300 overflow-hidden"
            alt={"github logo"}
            height={26}
          />
          Star on Github
        </motion.a>
      </div>
    </>
  );
}
