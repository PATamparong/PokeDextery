import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Images } from "../../components";
import { useSearch } from "../../provider";

const Header = ({ className }: { className?: string }) => {
  // const { darkMode, toggleTheme } = useTheme();
  const { searchQuery, setSearchQuery } = useSearch();
  const [showSearch, setShowSearch] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSearch(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className={`bg-sky-600 px-10 ${className}`}>
      <nav className="flex items-center justify-between text-white/80">
        <Link to="/">
          <Images className="w-32 h-24 object-contain" name="PokemonLogo" />
        </Link>
        <ul className="flex space-x-6 text-lg items-center">
          <li ref={searchRef} className="flex items-center space-x-2">
            {showSearch && (
              <motion.input
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "200px", opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Pokémon..."
                className="px-3 py-2 rounded-md border border-gray-300 text-gray-700 bg-white shadow-lg"
                autoFocus
              />
            )}
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="p-2 rounded-full text-white hover:bg-gray-700 transition-all"
            >
              <Search size={20} />
            </button>
          </li>

          <li>
            <Link to="/compare" className="hover:text-white">
              Compare Pokémon
            </Link>
          </li>
          <li>
            <Link to="/favorites" className="hover:text-white">
              Favorites
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
