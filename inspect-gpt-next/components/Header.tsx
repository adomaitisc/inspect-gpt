import Image from "next/image";
import Link from "next/link";
import logo from "../public/icons/inspect-gpt.svg";
import { signIn, useSession } from "next-auth/react";

export default function Header({ theme }: { theme: "light" | "dark" }) {
  const { data: session } = useSession();

  let filter, opacity, color;
  switch (theme) {
    case "dark":
      filter = "invert(0%)";
      opacity = "1";
      color = "white";
      break;
    case "light":
      filter = "invert(100%)";
      opacity = "0.8";
      color = "rgb(0,0,0,0.8)";
      break;
  }

  return (
    <header className="w-full flex justify-between items-center px-16 md:px-32 py-6">
      <Link href="/">
        <Image style={{ filter, opacity }} src={logo} alt={""} />
      </Link>
      {session ? (
        <Link
          style={{ color }}
          href="/dashboard"
          className="font-semibold rounded-2xl px-6 py-1.5 hover:opacity-40 duration-300"
        >
          Go to Dashboard
        </Link>
      ) : (
        <button
          style={{ color }}
          className="font-semibold rounded-2xl px-6 py-1.5 hover:opacity-40 duration-300"
          onClick={() => signIn()}
        >
          Sign in
        </button>
      )}
    </header>
  );
}
