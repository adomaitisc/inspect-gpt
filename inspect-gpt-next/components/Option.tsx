import { motion } from "framer-motion";
import Image from "next/image";
import chevron from "../public/chevron.svg";

export default function Option({
  setOpen,
  open,
  title,
  content,
}: {
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
      <div
        style={{
          borderTopRightRadius: borderTopRadius,
          borderTopLeftRadius: borderTopRadius,
          borderBottomRightRadius: borderBottomRadius,
          borderBottomLeftRadius: borderBottomRadius,
        }}
        onClick={() => setOpen(!open)}
        className="mt-4 w-3/4 py-2 px-6 border-2 border-zinc-300 bg-zinc-200/40 backdrop-blur-lg cursor-pointer"
      >
        <h2 className="flex gap-2 items-center justify-centerw-full text-xl font-bold">
          <Image style={{ rotate }} src={chevron} alt="chevron" /> {title}
        </h2>
      </div>
      {open && (
        <motion.div
          initial={{ opacity: 0, translateY: -30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.2 }}
          style={{
            borderTop,
            borderTopRightRadius: borderBottomRadius,
            borderTopLeftRadius: borderBottomRadius,
            borderBottomRightRadius: borderTopRadius,
            borderBottomLeftRadius: borderTopRadius,
          }}
          className="w-3/4 py-4 px-10 border-2 border-zinc-300 bg-zinc-300/20 backdrop-blur-lg"
        >
          {content}
        </motion.div>
      )}
    </>
  );
}
