/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  useGetPokemonByNameQuery,
  useGetAllPokemonsQuery,
} from "../../services/pokeApi";

export default function Compare() {
  const [pokemon1, setPokemon1] = useState("");
  const [pokemon2, setPokemon2] = useState("");

  const { data: allPokemonData } = useGetAllPokemonsQuery({
    limit: 1000,
    offset: 0,
  });
  const pokemonList =
    allPokemonData?.map((pokemon: any) => pokemon?.name) || [];

  const { data: data1 } = useGetPokemonByNameQuery(pokemon1, {
    skip: !pokemon1,
  });
  const { data: data2 } = useGetPokemonByNameQuery(pokemon2, {
    skip: !pokemon2,
  });

  const stats = [
    "hp",
    "attack",
    "defense",
    "speed",
    "special-attack",
    "special-defense",
  ];

  return (
    <div className="p-6 text-gray-500">
      <h1 className="text-2xl text-center mb-4">Compare Pokémon</h1>

      <div className="flex justify-center space-x-4 mb-6">
        <select
          value={pokemon1}
          onChange={(e) => setPokemon1(e.target.value)}
          className="p-2 text-black border rounded"
        >
          <option value="">Select Pokémon 1</option>
          {pokemonList.map((name: string) => (
            <option key={name} value={name}>
              {name.toUpperCase()}
            </option>
          ))}
        </select>

        <select
          value={pokemon2}
          onChange={(e) => setPokemon2(e.target.value)}
          className="p-2 text-black border rounded"
        >
          <option value="">Select Pokémon 2</option>
          {pokemonList.map((name: string) => (
            <option key={name} value={name}>
              {name.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          {data1 ? (
            <>
              <img
                src={data1?.sprites?.front_default}
                alt={pokemon1}
                className="mx-auto w-32 h-32"
              />
              <h2 className="text-xl capitalize mt-2">{pokemon1}</h2>
            </>
          ) : (
            <div className="h-32 w-32 mx-auto bg-gray-200"></div>
          )}
        </div>

        <table className="border border-gray-300 mx-auto">
          <thead>
            <tr>
              <th className="border px-4 py-2">Stat</th>
              <th className="border px-4 py-2">Value</th>
            </tr>
          </thead>
          <tbody>
            {stats.map((stat) => {
              const stat1 =
                data1?.stats?.find((s: any) => s.stat.name === stat)
                  ?.base_stat ?? "-";
              const stat2 =
                data2?.stats?.find((s: any) => s.stat.name === stat)
                  ?.base_stat ?? "-";
              return (
                <tr key={stat}>
                  <td className="border px-4 py-2 capitalize">{stat}</td>
                  <td className="border px-4 py-2">
                    {stat1} vs {stat2}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div>
          {data2 ? (
            <>
              <img
                src={data2?.sprites?.front_default}
                alt={pokemon2}
                className="mx-auto w-32 h-32"
              />
              <h2 className="text-xl capitalize mt-2">{pokemon2}</h2>
            </>
          ) : (
            <div className="h-32 w-32 mx-auto bg-gray-200"></div> // Placeholder image
          )}
        </div>
      </div>
    </div>
  );
}
