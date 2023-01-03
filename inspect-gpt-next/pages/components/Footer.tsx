export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="pb-12 flex flex-col items-center">
      <p className="text-white/60 font-medium text-sm pt-4">
        {currentYear} © Cauã Adomaitis
      </p>
    </footer>
  );
}
