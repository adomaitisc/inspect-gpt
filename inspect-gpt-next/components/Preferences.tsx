export default function Preferences({ session }: { session: any }) {
  return (
    <div className="w-full h-full">
      <h2 className="text-white text-lg md:text-xl font-semibold mt-6 mb-6">
        Preferences
      </h2>
      <div className="flex justify-between items-start">
        <div className="w-full mt-3 md:mt-0 flex flex-col gap-4">
          <div className="w-full flex items-start flex-wrap">
            <p className="w-full text-zinc-500 mb-1">Appereance</p>
            <div className="flex items-center text-zinc-200">
              <label className="mr-1.5">Default dashboard theme is</label>

              <select className="block py-1 px-0 text-base text-zinc-500 bg-transparent border-0 border-b-2 border-zinc-700 appearance-none focus:outline-none focus:ring-0 focus:border-purple-400 peer">
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>
          </div>
          <div className="w-full flex items-start flex-wrap">
            <p className="w-full text-zinc-500 mb-1`">Scan History Data</p>
            <div className="flex items-center text-zinc-200">
              <label className="mr-1.5">
                Automatically delete history after
              </label>

              <select className="block py-1 px-0 text-base text-zinc-500 bg-transparent border-0 border-b-2 border-zinc-700 appearance-none focus:outline-none focus:ring-0 focus:border-purple-400 peer">
                <option value="five">5 days</option>
                <option value="ten">10 days</option>
                <option value="thirty">30 days</option>
              </select>
            </div>
          </div>
          <div className="w-full flex items-start flex-wrap">
            <p className="w-full text-zinc-500 mb-1`">Email Preferences</p>
            <div className="flex items-center text-zinc-200">
              <label className="mr-1.5">Get emails on fresh updates?</label>

              <select className="block py-1 px-0 text-base text-zinc-500 bg-transparent border-0 border-b-2 border-zinc-700 appearance-none focus:outline-none focus:ring-0 focus:border-purple-400 peer">
                <option value="y">Yes, Please</option>
                <option value="n">No :/</option>
              </select>
            </div>
          </div>
          <div className="w-full flex items-start flex-wrap">
            <p className="w-full text-zinc-500 mb-1`">Share Feedback</p>
            <div className="flex items-center text-zinc-200">
              <label className="mr-1.5">
                A question, a suggestion, a concern:
              </label>

              <input
                placeholder="Your feedback here"
                className="py-1 text-zinc-300 bg-transparent border-b-2 border-zinc-700 focus:outline-none focus:ring-0 focus:border-purple-400 placeholder-zinc-500"
              />
            </div>
          </div>
        </div>
        <div className="w-full mt-3 md:mt-0 flex flex-col gap-4">
          <div className="w-full flex items-start flex-wrap">
            <p className="w-full text-zinc-500 mb-1`">Delete stuff</p>
            <div className="flex w-full items-center text-zinc-200">
              <label className="mr-1.5 text-red-500/80">
                Delete Scan History
              </label>

              <input
                placeholder="Type 'delete history'"
                className="py-1 text-zinc-300 bg-transparent border-b-2 border-zinc-700 focus:outline-none focus:ring-0 focus:border-red-400 placeholder-zinc-500"
              />
            </div>
          </div>
          <div className="w-full flex items-start flex-wrap">
            <div className="flex items-center text-zinc-200">
              <label className="mr-1.5 text-red-500/80">Delete Account</label>

              <input
                placeholder="Type 'delete account'"
                className="py-1 text-zinc-300 bg-transparent border-b-2 border-zinc-700 focus:outline-none focus:ring-0 focus:border-red-400 placeholder-zinc-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
