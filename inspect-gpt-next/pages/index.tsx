import Head from "next/head";

import Background from "../components/Background";
import Text from "../components/Text";
import Buttons from "../components/Buttons";
import Demo from "../components/Demo";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SEO from "../components/SEO";

export default function Home() {
  return (
    <div className="w-full overflow-x-hidden">
      <SEO />
      <Background />
      <main className="w-full flex flex-col items-center">
        <Header />
        <section className="flex flex-col gap-10 py-20 items-center">
          <Text />
          <Buttons />
        </section>
        <Demo />
        <Footer />
      </main>
    </div>
  );
}
