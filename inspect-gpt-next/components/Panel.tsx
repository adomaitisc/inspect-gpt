import { motion } from "framer-motion";
import { useSession } from "next-auth/react";

export default function Panel({ page }: { page: "dashboard" | "preferences" }) {
  const { data: session } = useSession();

  return (
    <main className="flex flex-col h-full w-full bg-zinc-900/90 backdrop-blur-lg items-center 2xl:rounded-r-2xl justify-between p-6">
      <div className="flex w-full px-6 flex-col justify-center items-start gap-4">
        {page === "dashboard" ? (
          <Dashboard session={session} />
        ) : (
          <Preferences session={session} />
        )}
      </div>
    </main>
  );
}

function Dashboard({ session }: { session: any }) {
  // mock data for website title, total paragraphs, and average gpt-chance
  let websites: any[] = [];
  websites = [
    {
      title: "Futurism - GPT-3 will dominate the world",
      totalParagraphs: 37,
      averageGPTChance: 0.72,
    },
    {
      title: "TechCrunch - Apple announces new line of revolutionary products",
      totalParagraphs: 89,
      averageGPTChance: 0.24,
    },
    {
      title:
        "The Verge - Amazon's new drone delivery service causes controversy",
      totalParagraphs: 15,
      averageGPTChance: 0.61,
    },
    {
      title:
        "Mashable - Facebook's new privacy policies spark outrage among users",
      totalParagraphs: 112,
      averageGPTChance: 0.48,
    },
    {
      title: "CNET - Alphabet's new AI assistant surpasses all expectations",
      totalParagraphs: 199,
      averageGPTChance: 0.93,
    },
  ];

  return (
    <div className="w-full p-6 flex flex-col gap-4">
      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          delay: 0.05,
          duration: 0.2,
        }}
        className="w-full text-white text-3xl font-medium overflow-hidden"
      >
        Welcome, {session?.user?.name}
      </motion.h1>
      <motion.h2
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          delay: 0.15,
          duration: 0.2,
        }}
        className="w-full text-white text-xl font-semibold mt-6"
      >
        Your Scan History
      </motion.h2>
      <div className="flex flex-col w-full gap-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 0.2,
            duration: 0.2,
          }}
          className="w-full flex items-center justify-start gap-6 text-sm font-semibold rounded-xl px-3 text-zinc-600"
        >
          <p className="w-1/3 md:w-1/2">Website</p>
          <p className="w-1/3 md:w-1/4">Paragraphs</p>
          <p className="w-1/3 md:w-1/4">GPT Chance</p>
        </motion.div>
        {websites.length > 0 ? (
          websites.map((website, index) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.25 + index * 0.05,
                duration: 0.2,
              }}
              key={website.title.length * index}
              className="w-full flex items-center justify-start font-medium gap-6 border rounded-xl py-1.5 px-4 border-zinc-300/20 bg-zinc-800/40 text-zinc-300"
            >
              <p className="w-1/3 md:w-1/2 h-6 truncate">{website.title}</p>
              <p className="w-1/3 md:w-1/4">{website.totalParagraphs}</p>
              <p className="w-1/3 md:w-1/4">
                {website.averageGPTChance * 100}%
              </p>
            </motion.div>
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.25,
              duration: 0.2,
            }}
            className="w-full flex flex-col items-center justify-center font-medium border rounded-xl py-1.5 px-4 border-zinc-300/20 bg-zinc-800/40 text-zinc-300"
          >
            <p>
              You have not scanned any websites yet. Install the Extension and
              start scanning.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

function Preferences({ session }: { session: any }) {
  return (
    <p className="w-full text-zinc-300 font-lg font-medium px-4 py-2 rounded-2xl hover:bg-zinc-700">
      Preferences
    </p>
  );
}
