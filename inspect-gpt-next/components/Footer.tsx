import Link from "next/link";

export default function Footer({ theme }: { theme: "light" | "dark" }) {
  let color;

  switch (theme) {
    case "dark":
      color = "rgb(255 255 255 / 0.6)";
      break;
    case "light":
      color = "rgb(0 0 0 / 0.6)";
      break;
  }

  const currentYear = new Date().getFullYear();
  return (
    <footer className="flex flex-col items-center justify-center gap-1">
      <a
        // style={{ color }}
        href="https://adomaitisc.com"
        rel="noreferrer"
        target="_blank"
        className="font-medium text-pink-500 text-sm py-1 px-2 cursor-pointer"
      >
        Cauã Adomaitis, {currentYear}
      </a>
    </footer>
  );
}
