import Image from "next/image";
import logo from "../public/inspect-gpt.svg";

export default function Header({ theme }: { theme: "light" | "dark" }) {
  let filter;
  let opacity;
  switch (theme) {
    case "dark":
      filter = "invert(0%)";
      opacity = "1";
      break;
    case "light":
      filter = "invert(100%)";
      opacity = "0.8";
      break;
  }

  return (
    <header className="w-full px-32 py-6">
      <Image style={{ filter, opacity }} src={logo} alt={""} />
    </header>
  );
}
