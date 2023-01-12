import Image from "next/image";
import noise from "../public/images/noise.svg";

export default function Background({ theme }: { theme: "light" | "dark" }) {
  let backgroundColor;
  let opacity;

  switch (theme) {
    case "dark":
      backgroundColor = "#0f0f0f";
      opacity = "0.4";
      break;
    case "light":
      backgroundColor = "#ffffff";
      opacity = "0.2";
      break;
  }

  return (
    <>
      <div
        style={{ backgroundColor }}
        className="fixed w-full top-0 bottom-0 -z-20 overflow-hidden"
      >
        <div
          id="blob-one"
          className="absolute top-0 left-0 h-[600px] w-[600px] rounded-full blur-[128px]"
        />
        <div
          id="blob-two"
          className="absolute bottom-0 right-0 h-[600px] w-[600px] rounded-full blur-[128px]"
        />
      </div>
      <Image
        src={noise}
        alt={""}
        quality={100}
        style={{ opacity }}
        className="fixed h-screen w-full -z-10 invert object-cover"
      />
    </>
  );
}
