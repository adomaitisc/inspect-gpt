import { motion } from "framer-motion";
import Image from "next/image";
import logo from "../public/inspect-gpt-logo.svg";
import Background from "./Background";

export default function Loader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 2, duration: 0.1 }}
      className="fixed w-screen h-screen flex justify-center items-center bg-[#0f0f0f] z-10"
    >
      <Image src={logo} alt="Page Loader" id="loader" className="w-16" />
      <Background />
    </motion.div>
  );
}
