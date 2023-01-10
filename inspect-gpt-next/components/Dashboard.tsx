export default function Dashboard({ session }: { session: any }) {
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
    <div className="w-full h-full mt-3 md:mt-0 flex flex-col gap-4">
      <h1 className="w-full text-white text-xl md:text-3xl font-medium overflow-hidden mt-6">
        Welcome, {session?.user?.name}
      </h1>
      <h2 className="w-full text-zinc-500 text-lg md:text-xl mt-3">
        Scan History
      </h2>
      <div className="flex flex-col w-full gap-2">
        <div className="w-full flex items-center justify-between sm:justify-start gap-6 text-sm font-semibold rounded-xl px-3 text-zinc-600">
          <p className="w-3/4 sm:w-2/3 md:w-3/4">Website</p>
          <p className="hidden sm:block w-1/6 md:w-[12.5%]">Paragraphs</p>
          <p className="sm:w-1/6 md:w-[12.5%]">GPT%</p>
        </div>
        {websites.length > 0 ? (
          websites.map((website, index) => (
            <div
              key={website.title.length * index}
              className="w-full flex items-center justify-between sm:justify-start font-medium gap-6 border rounded-xl py-1.5 px-4 border-zinc-300/20 bg-zinc-800/40 text-zinc-300"
            >
              <p className="w-3/4 sm:w-2/3 md:w-3/4 h-6 truncate">
                {website.title}
              </p>
              <p className="hidden sm:block w-1/6 md:w-[12.5%]">
                {website.totalParagraphs}
              </p>
              <p className="sm:w-1/6 md:w-[12.5%]">
                {website.averageGPTChance * 100}%
              </p>
            </div>
          ))
        ) : (
          <div className="w-full flex flex-col items-center justify-center font-medium border rounded-xl py-1.5 px-4 border-zinc-300/20 bg-zinc-800/40 text-zinc-300">
            <p>
              You have not scanned any websites yet. Install the Extension and
              start scanning.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}