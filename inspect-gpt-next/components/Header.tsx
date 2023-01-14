import Image from "next/image";
import Link from "next/link";
import logo from "../public/icons/inspect-gpt.svg";

export default function Header() {
  return (
    <header className="w-full flex justify-center sm:justify-start items-center px-16 md:px-32 py-6">
      <Link href="/">
        <Image src={logo} alt={""} />
      </Link>
    </header>
  );
}
