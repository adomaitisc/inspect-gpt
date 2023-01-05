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
    <footer className="pb-12 flex flex-col items-center">
      <a
        style={{ color }}
        href="https://adomaitisc.com"
        rel="noreferrer"
        target="_blank"
        className="font-medium text-sm pt-4 cursor-pointer"
      >
        {currentYear} © Cauã Adomaitis
      </a>
    </footer>
  );
}
