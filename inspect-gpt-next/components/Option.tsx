import { motion } from "framer-motion";
import Image from "next/image";
import chevron from "../public/icons/chevron.svg";

export default function Option({
  delay,
  setOpen,
  open,
  title,
  content,
}: {
  delay: number;
  setOpen: (val: boolean) => void;
  open: boolean;
  title: string;
  content: string;
}) {
  let borderTop;
  let borderTopRadius;
  let borderBottomRadius;
  let rotate;

  if (open) {
    borderTopRadius = "1rem";
    borderBottomRadius = "0";
    rotate = "90deg";
    borderTop = "none";
  } else {
    borderTopRadius = "1rem";
    borderBottomRadius = "1rem";
    rotate = "270deg";
    borderTop = "2px";
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay, duration: 0.3 }}
        style={{
          borderTopRightRadius: borderTopRadius,
          borderTopLeftRadius: borderTopRadius,
          borderBottomRightRadius: borderBottomRadius,
          borderBottomLeftRadius: borderBottomRadius,
        }}
        onClick={() => setOpen(!open)}
        className="text-zinc-800 mt-4 w-full md:w-3/4 py-2 px-6 border-2 border-zinc-300/80 bg-white/40 backdrop-blur-lg cursor-pointer z-10"
      >
        <h2 className="flex gap-2 items-center justify-centerw-full text:lg md:text-xl font-bold overflow-hidden">
          <Image style={{ rotate }} src={chevron} alt="chevron" /> {title}
        </h2>
      </motion.div>
      {open && (
        <motion.div
          initial={{ opacity: 0, translateY: -30, borderRadius: "none" }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            borderTop,
            borderTopRightRadius: borderBottomRadius,
            borderTopLeftRadius: borderBottomRadius,
            borderBottomRightRadius: borderTopRadius,
            borderBottomLeftRadius: borderTopRadius,
          }}
          className="w-full md:w-3/4 py-4 px-10 border-2 text-zinc-600 font-medium border-zinc-300 bg-white/20 backdrop-blur-lg"
        >
          {content}
        </motion.div>
      )}
    </>
  );
}
