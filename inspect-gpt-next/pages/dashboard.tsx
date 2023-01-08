// dashboard can only be accessed by authenticated users
// so we need to use getServerSideProps to check if the user is authenticated

import { Session } from "next-auth";
import { getSession, GetSessionParams } from "next-auth/react";
import { useState } from "react";
import Background from "../components/Background";
import Navbar from "../components/Navbar";
import Panel from "../components/Panel";

type User = {
  name: string;
  email: string;
  avatar: string;
};

export default function Dashboard({ session }: { session: Session }) {
  const { user } = session;
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [page, setPage] = useState<"dashboard" | "preferences">("dashboard");

  return (
    <div className="w-screen h-screen flex items-center justify-center ">
      <Background theme={theme} />
      <div className="flex w-full h-full 2xl:h-3/4 2xl:w-3/4 shadow-md 2xl:rounded-2xl 2xl:border-2 2xl:border-white/20">
        <Navbar setPage={setPage} page={page} />
        <Panel page={page} />
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetSessionParams) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
}
