import { motion } from "framer-motion";

export default function Preferences({ session }: { session: any }) {
  return (
    <div className="w-full mt-3 md:mt-0 flex flex-col gap-4">
      <motion.h2
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          delay: 0.1,
          duration: 0.2,
        }}
        className="w-full text-white text-lg md:text-xl font-semibold mt-6"
      >
        Preferences
      </motion.h2>
      <div className="w-full flex items-start flex-wrap">
        <p className="w-full text-zinc-500">Appereance</p>
        <div className="flex text-zinc-200 border rounded-md border-zinc-600">
          <button className="px-4 py-2 border-r border-zinc-600">Dark</button>

          <button className="px-4 py-2 bg-purple-400/80">Light</button>
        </div>
      </div>
    </div>
  );
}
