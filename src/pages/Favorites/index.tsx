import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Pencil, Trash2 } from "lucide-react";
import { useGetPokemonByNameQuery } from "../../services/pokeApi";
import { useSearch } from "../../provider";
import { PokemonCry } from "../../components";

export default function Favorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string>("all");
  const [pokemonTypes, setPokemonTypes] = useState<string[]>([]);
  const { searchQuery } = useSearch();

  useEffect(() => {
    const storedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    setFavorites(storedFavorites);
  }, []);

  const removeFromFavorites = (pokemonName: string) => {
    const updatedFavorites = favorites.filter((name) => name !== pokemonName);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const filteredFavorites = favorites.filter((pokemonName) =>
    pokemonName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl text-gray-500">Favorite Pokémon</h1>

        <select
          className="px-4 py-2 rounded bg-white text-black border border-gray-300"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="all">All Types</option>
          {pokemonTypes.map((type) => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {filteredFavorites.length === 0 ? (
        <p className="text-center text-white">No matching favorites found.</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {filteredFavorites.map((pokemonName) => (
            <FavoriteCard
              key={pokemonName}
              pokemonName={pokemonName}
              removeFromFavorites={removeFromFavorites}
              selectedType={selectedType}
              setPokemonTypes={setPokemonTypes}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function FavoriteCard({
  pokemonName,
  removeFromFavorites,
  selectedType,
  setPokemonTypes,
}: {
  pokemonName: string;
  removeFromFavorites: (name: string) => void;
  selectedType: string;
  setPokemonTypes: (types: string[]) => void;
}) {
  const {
    data: pokemon,
    error,
    isLoading,
  } = useGetPokemonByNameQuery(pokemonName.toLowerCase());

  useEffect(() => {
    if (pokemon) {
      const types = pokemon?.types?.map((t: any) => t.type.name) || [];
      setPokemonTypes((prevTypes) => [...new Set([...prevTypes, ...types])]);
    }
  }, [pokemon, setPokemonTypes]);

  if (isLoading)
    return <p className="text-center text-white">Loading Pokémon...</p>;
  if (error)
    return <p className="text-center text-red-500">Error fetching Pokémon!</p>;

  const types = pokemon?.types?.map((t: any) => t.type.name);
  const matchesFilter = selectedType === "all" || types.includes(selectedType);

  if (!matchesFilter) return null;

  return (
    <motion.div
      className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{
        scale: 1.05,
        boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
      }}
    >
      <Link
        to={`/customizer/${pokemon?.name}`}
        className="absolute top-2 left-2 outline-2 outline-offset-2 outline-blue-500 text-blue-500 hover:text-blue-400"
      >
        <Pencil size={20} />
      </Link>
      <button
        onClick={() => removeFromFavorites(pokemonName)}
        className="absolute top-2 right-2 text-gray-700 hover:text-red-500"
      >
        <Trash2 size={20} />
      </button>
      <PokemonCry
        className="absolute bottom-1 right-1"
        pokemonId={pokemon?.id as number}
      />

      <Link
        to={`/pokemon/${pokemonName}`}
        className="flex flex-col items-center"
      >
        <img
          src={pokemon?.sprites?.front_default}
          alt={pokemonName}
          className="w-32 h-32"
        />
        <h2 className="text-xl font-semibold capitalize">{pokemonName}</h2>
        <p className="text-sm text-gray-500">
          {types
            ?.map((type) => type.charAt(0).toUpperCase() + type.slice(1))
            .join(", ")}
        </p>
      </Link>
    </motion.div>
  );
}
