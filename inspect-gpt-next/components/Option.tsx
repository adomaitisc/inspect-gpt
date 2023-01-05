import { motion } from "framer-motion";

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
  return (
    <>
      <div
        onClick={() => setOpen(!open)}
        className="text-xl block font-bold text-purple-600 w-full py-4 px-6 rounded-3xl border-2 border-zinc-300 bg-zinc-300/20 backdrop-blur-lg"
      >
        {title}
      </div>
      {open && (
        <motion.div
          initial={{ opacity: 0, translateY: -30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.2 }}
          className="py-4 px-6 rounded-3xl border-2 border-zinc-300 bg-zinc-300/20 backdrop-blur-lg"
        >
          {content}
        </motion.div>
      )}
    </>
  );
}
