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
        <p className="w-full text-zinc-500 mb-1">Appereance</p>
        <div className="flex items-center text-zinc-200">
          <label className="mr-1.5">Default theme is</label>

          <select
            id="underline_select"
            className="block py-1 px-0 text-base text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
      </div>
      <div className="w-full flex items-start flex-wrap">
        <p className="w-full text-zinc-500 mb-1`">Scan History Data</p>
        <div className="flex items-center text-zinc-200">
          <label className="mr-1.5">Automatically delete history after</label>

          <select
            id="underline_select"
            className="block py-1 px-0 text-base text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
          >
            <option value="five">5 days</option>
            <option value="ten">10 days</option>
            <option value="thirty">30 days</option>
          </select>
        </div>
      </div>
    </div>
  );
}
