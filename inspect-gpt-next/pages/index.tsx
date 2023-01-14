import Intro from "../components/Intro";
import Buttons from "../components/Buttons";
import Demo from "../components/Demo";
import Header from "../components/Header";
import SEO from "../components/SEO";

export default function Home() {
  return (
    <div className="w-full">
      <SEO
        title="InspectGPT | Download Extension"
        description="Identify GPT-generated text on any web page with our advanced extension."
        image="https://github.com/adomaitisc/inspect-gpt/blob/main/inspect-gpt-next/public/og/home-image.png?raw=true"
        url="https://inspectgpt.com/"
      />
      <main className="w-full flex flex-col items-center">
        <Header />
        <section className="flex flex-col py-20 items-center">
          <Intro />
          <Buttons />
        </section>
        <Demo />
      </main>
    </div>
  );
}
