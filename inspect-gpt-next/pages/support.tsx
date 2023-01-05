import Background from "../components/Background";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SEO from "../components/SEO";

export default function Support() {
  return (
    <>
      <div className="w-full overflow-x-hidden">
        <SEO />
        <Background />
        <main className="w-full flex flex-col items-center">
          <Header />
          <section className="flex flex-col gap-10 py-20 items-center"></section>
          <Footer />
        </main>
      </div>
    </>
  );
}
