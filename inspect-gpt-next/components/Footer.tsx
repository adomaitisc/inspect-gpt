import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="absolute bottom-4 flex flex-col items-center justify-center gap-1">
      <div className="flex flex-row gap-2">
        <Link href="/support">
          <p className="text-white/40 text-sm py-1 px-2 cursor-pointer hover:text-white duration-200">
            Support
          </p>
        </Link>
        <Link href="https://twitter.com/inspectgpt">
          <p className="text-white/40 text-sm py-1 px-2 cursor-pointer hover:text-white duration-200">
            Twitter
          </p>
        </Link>
      </div>

      <a
        // style={{ color }}
        href="https://adomaitisc.com"
        rel="noreferrer"
        target="_blank"
        className=" text-white/40 text-sm py-1 px-2 cursor-pointer hover:text-white duration-200"
      >
        Cauã Adomaitis, {currentYear}
      </a>
    </footer>
  );
}
