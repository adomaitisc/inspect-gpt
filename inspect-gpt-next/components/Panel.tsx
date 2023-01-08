import { useSession } from "next-auth/react";

import Preferences from "./Preferences";
import Dashboard from "./Dashboard";

export default function Panel({ page }: { page: "dashboard" | "preferences" }) {
  const { data: session } = useSession();

  return (
    <main className="flex flex-col h-full w-full bg-zinc-900/90 backdrop-blur-lg items-center 2xl:rounded-r-2xl justify-between p-6">
      <div className="flex w-full flex-col justify-center items-start gap-4">
        {page === "dashboard" ? (
          <Dashboard session={session} />
        ) : (
          <Preferences session={session} />
        )}
      </div>
    </main>
  );
}
