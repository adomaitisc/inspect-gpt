import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import extension from "../public/images/extension.svg";

export default function Demo() {
  const demoRef = useRef<HTMLDivElement>(null);

  const [pageHeight, updatePageHeight] = useState<number | undefined>(
    undefined
  );
  const [scrollPosition, updateScrollPosition] = useState<number | undefined>(
    undefined
  );
  const [distanceFromTop, updateDistanceFromTop] = useState<number | undefined>(
    undefined
  );
  const [elementHeight, updateElementHeight] = useState<number | undefined>(
    undefined
  );

  const [position, updatePosition] = useState<"fixed" | "static">("static");
  const [opacity, updateOpacity] = useState<number>(0);

  useEffect(() => {
    const pageHeight = document.querySelector("html")?.clientHeight;
    updatePageHeight(pageHeight);
    updateDistanceFromTop(demoRef.current?.offsetTop);
    updateElementHeight(demoRef.current?.clientHeight);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      updateScrollPosition(scrollPosition);
    };
    window.addEventListener("scroll", handleScroll);
    () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (
      scrollPosition! >=
      distanceFromTop! - pageHeight! / 2 + elementHeight! / 2
    ) {
      updateOpacity(1);
      updatePosition("fixed");
    } else {
      updateOpacity(0);
      updatePosition("static");
    }
  }, [scrollPosition]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.3 }}
        className="w-full h-full max-w-lg px-6 flex items-center justify-center z-10"
        ref={demoRef}
        style={{
          position,
          top: 0,
          bottom: 0,
        }}
      >
        <Image
          src={extension}
          alt={""}
          className="w-full rounded-[16px] shadow-lg border-2 border-white/20 "
        />
      </motion.div>
      <motion.div
        initial={{ opacity }}
        animate={{ opacity }}
        transition={{ delay: 0.3, duration: 0.3 }}
        style={{
          height: elementHeight,
          top: distanceFromTop! - pageHeight! / 2 + elementHeight! / 3.8,
        }}
        className="fixed flex justify-between w-full"
      >
        <div className="bg-zinc-900 w-1/3 flex flex-col items-end justify-center">
          <div className="w-2/3 text-right">
            <h1>Page Scan</h1>
            <h1>The number of AI-generated paragraphs on the page</h1>
            <h1>The total number of paragraphs on the page</h1>
            <h1>
              The paragraph with the highest percentage of being AI-generated
            </h1>
            <h1>The chance of the whole page being written by AI.</h1>
          </div>
        </div>
        <div className="bg-zinc-900 w-1/3 flex flex-col items-start justify-center">
          Texto Texto Texto Texto Texto Texto Texto Texto Texto Texto Texto
          Texto
        </div>
      </motion.div>
    </>
  );
}
