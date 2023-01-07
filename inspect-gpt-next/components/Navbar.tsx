import Image from "next/image";
import noise from "../public/images/noise.svg";
import logo from "../public/icons/inspect-gpt.svg";
import pref from "../public/icons/preferences.svg";
import dash from "../public/icons/dashboard.svg";
import install from "../public/icons/install.svg";
import Link from "next/link";
import { MouseEvent } from "react";
import { useSession } from "next-auth/react";

export default function Navbar({
  setPage,
  page,
}: {
  setPage: (page: "dashboard" | "preferences") => void;
  page: "dashboard" | "preferences";
}) {
  const { data: session } = useSession();

  const togglePage = (e: any) => {
    e.currentTarget.style.backgroundColor = "rgb(24 24 27 / 0.4)";
    setPage(e.currentTarget.name as "dashboard" | "preferences");
  };

  return (
    <nav className="flex flex-col h-full w-80 bg-zinc-800/90 backdrop-blur-lg items-center justify-between p-6">
      <div className="flex w-full flex-col justify-center items-start gap-4">
        <Image src={logo} className="mb-6 self-center" alt="Inspect GPT" />
        <button
          name="dashboard"
          style={{ opacity: page === "dashboard" ? "1" : "0.5" }}
          onClick={(e) => togglePage(e)}
          className="w-full flex items-center justify-start text-left text-white font-xl font-medium px-4 py-2 rounded-2xl hover:bg-zinc-900/40 duration-300"
        >
          <Image
            style={{ opacity: page === "dashboard" ? "1" : "0.5" }}
            src={dash}
            className="mr-2 w-5"
            alt="Dashboard"
          />
          Dahsboard
        </button>
        <button
          name="preferences"
          style={{
            opacity: page === "preferences" ? "1" : "0.5",
          }}
          onClick={(e) => togglePage(e)}
          className="w-full flex items-center justify-start text-left text-white font-xl font-medium px-4 py-2 rounded-2xl hover:bg-zinc-900/40 duration-300"
        >
          <Image
            style={{ opacity: page === "preferences" ? "1" : "0.5" }}
            src={pref}
            className="mr-2 w-5"
            alt="Preferences"
          />
          Preferences
        </button>
      </div>
      <div className="flex w-full flex-col justify-center items-start gap-4">
        <Link
          href=""
          target="_blank"
          rel="noreferrer"
          className="w-full flex items-center justify-start text-left text-purple-400 font-xl font-medium px-4 py-2 rounded-2xl bg-zinc-900/40 hover:bg-zinc-900/80 duration-300"
        >
          <Image className="mr-2 w-5" src={install} alt="Install Extension" />
          Install Extension
        </Link>
        <button className="w-full flex items-center justify-start text-left text-zinc-300 font-lg font-medium px-4 py-2 rounded-2xl hover:bg-zinc-700">
          <Image
            src={session!.user!.image!}
            width={36}
            height={36}
            className="rounded-full mr-4"
            alt="User Avatar"
          />
          Logout
        </button>
      </div>
    </nav>
  );
}
