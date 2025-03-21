const Footer = ({ className }: { className: string }) => {
  return (
    <footer
      className={`${className} bg-sky-600 text-white px-10 py-4 text-center`}
    >
      © 2025 PokéDextery. All rights reserved.
    </footer>
  );
};

export default Footer;
