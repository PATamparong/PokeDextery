import { useState, useEffect } from "react";
import { useGetAllPokemonsQuery } from "../../services/pokeApi";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useSearch } from "../../provider";
import { Pencil, Heart } from "lucide-react";
import { PokemonCry } from "../../components";

export default function Pokemon() {
  const {
    data: allPokemons = [],
    error,
    isLoading,
  } = useGetAllPokemonsQuery({ limit: 1000, offset: 0 });

  const { searchQuery } = useSearch();

  const limit = 9;
  const [currentPage, setCurrentPage] = useState(1);
  const [inputPage, setInputPage] = useState("");
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    if (!allPokemons) return;

    const filtered = allPokemons.filter((pokemon: { name: string }) =>
      pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredPokemons(filtered);
    setCurrentPage(1);
  }, [searchQuery, allPokemons]);

  useEffect(() => {
    const storedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    setFavorites(storedFavorites);
  }, []);

  if (isLoading)
    return <p className="text-center text-white">Loading Pokémon...</p>;
  if (error)
    return <p className="text-center text-red-500">Error fetching Pokémon!</p>;

  const handlePageSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const pageNumber = parseInt(inputPage, 10);
    if (!isNaN(pageNumber) && pageNumber > 0) {
      setCurrentPage(pageNumber);
    }
    setInputPage("");
  };

  const toggleFavorite = (pokemonName: string) => {
    let updatedFavorites;
    if (favorites.includes(pokemonName)) {
      updatedFavorites = favorites.filter((name) => name !== pokemonName);
    } else {
      updatedFavorites = [...favorites, pokemonName];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const offset = (currentPage - 1) * limit;
  const paginatedPokemons = filteredPokemons.slice(offset, offset + limit);

  return (
    <div>
      <div className="p-6">
        <div className="grid grid-cols-3 gap-4">
          {paginatedPokemons.map(
            (pokemon: { id: number; name: string; image: string }, index) => (
              <motion.div
                key={pokemon.id}
                className="relative perspective"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
                }}
              >
                <Link
                  to={`/customizer/${pokemon?.name}`}
                  className="absolute top-2 right-2 outline-2 outline-offset-2 outline-blue-500 text-blue-500 hover:text-blue-400"
                >
                  <Pencil size={20} />
                </Link>
                <button
                  onClick={() => toggleFavorite(pokemon?.name)}
                  className="absolute top-2 left-2 text-gray-700 hover:text-red-500"
                >
                  <Heart
                    size={20}
                    fill={favorites.includes(pokemon.name) ? "red" : "none"}
                  />
                </button>
                <PokemonCry
                  className="absolute bottom-1 right-1"
                  pokemonId={pokemon.id}
                />

                <Link
                  to={`/pokemon/${pokemon.name}`}
                  className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center"
                >
                  <motion.img
                    src={pokemon.image}
                    alt={pokemon.name}
                    className="w-32 h-32"
                    whileHover={{
                      rotateX: 15,
                      rotateY: 15,
                      scale: 1.1,
                    }}
                    transition={{ type: "spring", stiffness: 100 }}
                  />
                  <h2 className="text-xl font-semibold capitalize mt-2 text-gray-500">
                    {pokemon.name}
                  </h2>
                </Link>
              </motion.div>
            )
          )}
        </div>

        {filteredPokemons.length > limit && (
          <div className="flex justify-center mt-6 space-x-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-600 text-white rounded disabled:opacity-50"
            >
              Previous
            </button>

            <form
              onSubmit={handlePageSubmit}
              className="flex items-center space-x-2"
            >
              <input
                type="number"
                value={inputPage}
                onChange={(e) => setInputPage(e.target.value)}
                placeholder="Go to page..."
                className="px-2 py-1 border rounded w-20 text-center"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Go
              </button>
            </form>

            <span className="text-gray-500 mt-2">Page {currentPage}</span>

            <button
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="px-4 py-2 bg-gray-600 text-white rounded"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
