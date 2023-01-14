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
    updateDistanceFromTop(
      pageHeight! - demoRef.current!.getBoundingClientRect().top
    );
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
      distanceFromTop! - scrollPosition! + elementHeight! / 2 <=
      pageHeight! / 2
    ) {
      updatePosition("fixed");
      updateOpacity(0.4);
    } else {
      updatePosition("static");
      updateOpacity(0);
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
    </>
  );
}
