import Background from "../components/Background";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SEO from "../components/SEO";

export default function Support() {
  return (
    <>
      <div className="w-full overflow-x-hidden">
        <SEO
          title="InspectGPT | Support"
          description="Get help with our extension."
          image="https://github.com/adomaitisc/inspect-gpt/blob/main/inspect-gpt-next/public/support-image.png?raw=true"
          url="https://inspectgpt.com/support"
        />
        <Background color="light" />
        <main className="w-full flex flex-col items-center">
          <Header />
          <section className="flex flex-col gap-10 py-20 items-center"></section>
          <Footer />
        </main>
      </div>
    </>
  );
}
