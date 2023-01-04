export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="pb-12 flex flex-col items-center">
      <a
        href="https://adomaitisc.com"
        rel="noreferrer"
        target="_blank"
        className="text-white/60 font-medium text-sm pt-4 cursor-pointer"
      >
        {currentYear} © Cauã Adomaitis
      </a>
    </footer>
  );
}
