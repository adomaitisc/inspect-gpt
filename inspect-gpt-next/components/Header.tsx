import Image from "next/image";
import logo from "../public/inspect-gpt.svg";

export default function Header() {
  return (
    <header className="w-full px-32 py-6">
      <Image src={logo} alt={""} />
    </header>
  );
}
