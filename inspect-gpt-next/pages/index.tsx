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
      <SEO
        title="InspectGPT | Download Extension"
        description="Identify GPT-generated text on any web page with our advanced extension."
        image="https://github.com/adomaitisc/inspect-gpt/blob/main/inspect-gpt-next/public/home-image.png?raw=true"
        url="https://inspectgpt.com/"
      />
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
