import Image from "next/image";
import noise from "../public/noise.png";

export default function Background() {
  return (
    <>
      <div className="fixed w-full top-0 bottom-0 -z-20">
        <div
          id="blob-one"
          className="absolute top-0 left-0 h-96 w-96 bg-purple-300 rounded-full blur-[128px]"
        />
        <div
          id="blob-two"
          className="absolute bottom-0 right-0 h-96 w-96 bg-blue-300 rounded-full blur-[128px]"
        />
      </div>
      <Image
        src={noise}
        alt={""}
        quality={100}
        className="fixed h-screen w-full -z-10 invert object-cover opacity-60"
      />
    </>
  );
}
