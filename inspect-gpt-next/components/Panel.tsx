import { useSession } from "next-auth/react";

export default function Panel({ page }: { page: "dashboard" | "preferences" }) {
  const { data: session } = useSession();

  return (
    <main className="flex flex-col h-full w-full bg-zinc-900/90 backdrop-blur-lg items-center justify-between p-6">
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
  const websites = [
    {
      title: "Google",
      totalParagraphs: 100,
      averageGPTChance: 0.5,
    },
    {
      title: "Facebook",
      totalParagraphs: 100,
      averageGPTChance: 0.5,
    },
    {
      title: "Twitter",
      totalParagraphs: 100,
      averageGPTChance: 0.5,
    },
    {
      title: "Reddit",
      totalParagraphs: 100,
      averageGPTChance: 0.5,
    },
    {
      title: "Instagram",
      totalParagraphs: 100,
      averageGPTChance: 0.5,
    },
    {
      title: "Amazon",
      totalParagraphs: 100,
      averageGPTChance: 0.5,
    },
    {
      title: "Netflix",
      totalParagraphs: 100,
      averageGPTChance: 0.5,
    },
    {
      title: "Spotify",
      totalParagraphs: 100,
      averageGPTChance: 0.5,
    },
    {
      title: "TikTok",
      totalParagraphs: 100,
      averageGPTChance: 0.5,
    },
    {
      title: "Snapchat",
      totalParagraphs: 100,
      averageGPTChance: 0.5,
    },
  ];

  return (
    <div className="w-full p-6 flex flex-col gap-4">
      <h1 className="w-full text-purple-400 text-2xl font-medium">
        Welcome, {session?.user?.name}
      </h1>
      <h2 className="w-full text-white text-xl font-semibold mt-6">
        Your website scan history
      </h2>
      <div className="flex flex-col w-full gap-4">
        <div className="w-full flex items-center justify-start gap-4 text-sm font-semibold rounded-xl px-4 text-zinc-600">
          <p className="w-1/3">Website Title</p>
          <p className="w-1/3">Number of Paragraphs</p>
          <p className="">Average GPT chance</p>
        </div>
        {websites.map((website, index) => (
          <div
            key={website.title.length * index}
            className="w-full flex items-center justify-start font-bold gap-4 border rounded-xl py-1.5 px-4 border-zinc-300/20 bg-zinc-800/40 text-zinc-300"
          >
            <p className="w-1/3">{website.title}</p>
            <p className="w-1/3">{website.totalParagraphs}</p>
            <p className="">{website.averageGPTChance}</p>
          </div>
        ))}
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
