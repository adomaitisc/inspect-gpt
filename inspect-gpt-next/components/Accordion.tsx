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
    border: open ? "2px" : "none",
  };

  const borderRadius = open ? "1rem 1rem 0 0" : "1rem";
  const transition = open ? "border-radius" : "border-radius .1s .3s";

  return (
    <>
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay, duration: 0.3 }}
        style={{
          borderRadius,
          transition,
        }}
        onClick={() => setOpen(!open)}
        className="text-zinc-800 mt-4 w-full md:w-3/4 py-2 px-6 bg-white/40 backdrop-blur-lg cursor-pointer z-10"
      >
        <h2 className="flex gap-2 items-center justify-centerw-full text:lg md:text-xl font-bold overflow-hidden">
          <Image
            style={{ rotate, transitionDuration: "0.2s" }}
            src={chevron}
            alt="chevron"
          />{" "}
          {title}
        </h2>
      </motion.button>
      <LazyMotion features={domAnimation} strict>
        <m.div
          initial={{ height: 0, opacity: 1 }}
          animate={animate}
          className="w-full md:w-3/4 px-10 text-zinc-600 font-medium bg-white/40 rounded-b-2xl backdrop-blur-lg"
        >
          <p className="h-3 w-full"></p>
          {content}
          <p className="h-3 w-full"></p>
        </m.div>
      </LazyMotion>
    </>
  );
}
