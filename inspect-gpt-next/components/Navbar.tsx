import Image from "next/image";
import close from "../public/icons/close.svg";
import navbar from "../public/icons/navbar.svg";
import logo from "../public/icons/inspect-gpt.svg";
import pref from "../public/icons/preferences.svg";
import dash from "../public/icons/dashboard.svg";
import install from "../public/icons/install.svg";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Navbar({
  setPage,
  page,
}: {
  setPage: (page: "dashboard" | "preferences") => void;
  page: "dashboard" | "preferences";
}) {
  const { data: session } = useSession();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const togglePage = (e: any) => {
    e.currentTarget.style.backgroundColor = "rgb(24 24 27 / 0.4)";
    setPage(e.currentTarget.name as "dashboard" | "preferences");
  };

  return (
    <>
      <button
        onClick={() => setIsMobileNavOpen(true)}
        className="absolute top-4 z-10 right-8 md:hidden h-16"
      >
        <Image className="w-8" src={navbar} alt="navbar" />
      </button>
      <AnimatePresence>
        {isMobileNavOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsMobileNavOpen(false)}
            className="md:hidden absolute top-0 left-0 h-screen w-screen bg-black/20 backdrop-blur-sm z-10 flex items-start justify-center overflow-hidden"
          >
            <motion.nav
              initial={{ opacity: 0, translateY: "-100%" }}
              animate={{ opacity: 1, translateY: "0%" }}
              exit={{ opacity: 1, translateY: "-100%" }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="flex flex-col w-full mx-6 mt-6 rounded-xl bg-zinc-800 shadow-md items-center justify-between p-6 overflow-hidden"
            >
              <div className="flex w-full flex-col justify-center items-start gap-4">
                <Image src={logo} alt="Inspect GPT" className="h-12 px-4" />
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
                <div className="bg-zinc-700 h-[1px] w-full"></div>
                <Link
                  href=""
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-start text-left text-purple-400 font-xl font-medium px-4 py-2 rounded-2xl bg-zinc-900/40 hover:bg-zinc-900/80 duration-300"
                >
                  <Image
                    src={install}
                    className="mr-2 w-5"
                    alt="Install Inspect GPT"
                  />
                  Install Extension
                </Link>
                <button
                  onClick={() => signOut()}
                  className="w-full flex items-center justify-start text-left text-white font-xl font-medium px-4 py-2 rounded-2xl bg-zinc-900/40 hover:bg-zinc-900/80 duration-300"
                >
                  <Image
                    src={session!.user!.image!}
                    width={36}
                    height={36}
                    className="rounded-full mr-2"
                    alt="User Avatar"
                  />
                  Logout
                </button>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
      <nav className="hidden md:flex flex-col h-full w-80 bg-zinc-800/90 backdrop-blur-lg items-center 2xl:rounded-l-2xl justify-between p-6">
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
          <button
            onClick={() => signOut()}
            className="w-full flex items-center justify-start text-left text-zinc-300 font-lg font-medium px-4 py-2 rounded-2xl hover:bg-zinc-900/40 duration-300"
          >
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
    </>
  );
}
