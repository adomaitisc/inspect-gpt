import { motion } from "framer-motion";
import Image from "next/image";
import extension from "../public/images/extension.svg";

export default function Demo() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3, duration: 0.3 }}
      className="pb-20 w-full h-full max-w-lg px-6"
    >
      <Image
        src={extension}
        alt={""}
        className="w-full rounded-[16px] shadow-lg border-2 border-white/20 "
      />
    </motion.div>
  );
}
