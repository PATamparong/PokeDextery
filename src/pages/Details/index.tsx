import { useParams } from "react-router-dom";
import { useGetPokemonByNameQuery } from "../../services/pokeApi";
import PokemonCry from "../../components/PokemonCry";

export default function Details() {
  const { name } = useParams();
  const { data: pokemon, error, isLoading } = useGetPokemonByNameQuery(name);

  if (isLoading)
    return <p className="text-center text-white">Loading Pokémon...</p>;
  if (error)
    return (
      <p className="text-center text-red-500">
        Error fetching Pokémon details!
      </p>
    );

  return (
    <div className="flex flex-col items-center text-gray-500 p-6 min-h-screen">
      <div className="p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex flex-col items-center">
          <img
            src={pokemon?.sprites?.front_default}
            alt={pokemon?.name}
            className="w-40 h-40"
          />
          <h1 className="text-4xl font-bold capitalize mt-7">
            {pokemon?.name}
          </h1>
        </div>
        <div className="flex flex-row gap-10 space-between mt-8 text-left">
          <p className="text-lg">
            <span className="font-semibold">Height:</span> {pokemon?.height}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Weight:</span> {pokemon?.weight}
          </p>
          <div className="flex justify-end w-full">
            <PokemonCry pokemonId={pokemon?.id as number} label="Play cry" />
          </div>
        </div>
        <div className="mt-4">
          <h2 className="text-2xl font-semibold">Type</h2>
          <div className="flex gap-2 mt-2">
            {pokemon?.types?.map((t) => (
              <span
                key={t.type.name}
                className={`px-3 py-1 rounded-full text-sm text-white font-semibold ${
                  typeColors[t.type.name] || "bg-gray-600"
                }`}
              >
                {t.type.name}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-2xl font-semibold">Base Stats</h2>
          <div className="mt-2">
            {pokemon?.stats?.map((s) => (
              <div key={s.stat.name} className="mt-2">
                <p className="text-sm font-semibold capitalize">
                  {s.stat.name}: {s.base_stat}
                </p>
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                  <div
                    className="h-2.5 rounded-full bg-green-400"
                    style={{ width: `${(s.base_stat / 150) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const typeColors = {
  fire: "bg-red-500",
  water: "bg-blue-500",
  grass: "bg-green-500",
  electric: "bg-yellow-500",
  ice: "bg-cyan-400",
  fighting: "bg-orange-700",
  poison: "bg-purple-600",
  ground: "bg-yellow-700",
  flying: "bg-indigo-500",
  psychic: "bg-pink-500",
  bug: "bg-lime-500",
  rock: "bg-gray-600",
  ghost: "bg-indigo-700",
  dragon: "bg-blue-800",
  dark: "bg-gray-800",
  steel: "bg-gray-400",
  fairy: "bg-pink-400",
};
