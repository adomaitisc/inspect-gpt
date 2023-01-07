export default function Panel({ page }: { page: "dashboard" | "preferences" }) {
  return (
    <main className="flex flex-col h-full w-full bg-zinc-700 items-center justify-between p-6">
      <div className="flex w-full px-6 flex-col justify-center items-start gap-4">
        {page === "dashboard" ? <Dashboard /> : <Preferences />}
      </div>
    </main>
  );
}

function Dashboard() {
  return (
    <p className="w-full text-zinc-300 font-lg font-medium px-4 py-2 rounded-2xl hover:bg-zinc-700">
      Dahsboard
    </p>
  );
}

function Preferences() {
  return (
    <p className="w-full text-zinc-300 font-lg font-medium px-4 py-2 rounded-2xl hover:bg-zinc-700">
      Preferences
    </p>
  );
}
