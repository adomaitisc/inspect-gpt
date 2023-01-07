import { domAnimation, LazyMotion, m, motion } from "framer-motion";
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
  let rotate;

  if (open) {
    rotate = "90deg";
  } else {
    rotate = "270deg";
  }

  const animate = {
    transition: { type: "tween", duration: 0.3 },
    height: open ? "auto" : 0,
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.3 }}
      className="bg-zinc-200/20 flex flex-col items-start border-2 border-zinc-500/20 rounded-2xl backdrop-blur-md w-full md:w-3/4 mt-4"
    >
      <span
        onClick={() => setOpen(!open)}
        className="text-zinc-800 py-2 px-2 cursor-pointer z-10 w-full"
      >
        <h2 className="flex items-center justify-centerw-full text:lg md:text-xl font-bold overflow-hidden">
          <Image
            style={{ rotate, transitionDuration: "0.2s" }}
            src={chevron}
            alt="chevron"
          />{" "}
          {title}
        </h2>
      </span>
      <LazyMotion features={domAnimation} strict>
        <m.div
          initial={{ height: 0, opacity: 1 }}
          animate={animate}
          className="px-10 text-zinc-600 font-medium rounded-b-2xl overflow-hidden"
        >
          {content}
          <p className="h-3 w-full"></p>
        </m.div>
      </LazyMotion>
    </motion.div>
  );
}
