/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// interface PokemonsResponse {
//   data: {
//     pokemons: {
//       results: {
//         id: number;
//         name: string;
//         image: string;
//       }[];
//     };
//   };
// }

// interface PokemonDetailResponse {
//   data: {
//     pokemon: {
//       id: number;
//       name: string;
//       height: number;
//       weight: number;
//       sprites: {
//         front_default: string;
//       };
//       stats: {
//         base_stat: number;
//         stat: {
//           name: string;
//         };
//       };
//     };
//   };
// }

export const pokeApi = createApi({
  reducerPath: "pokeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://graphql-pokeapi.graphcdn.app/",
  }), // Updated GraphQL API URL
  endpoints: (builder) => ({
    getPokemonByName: builder.query({
      query: (name) => ({
        url: "",
        method: "POST",
        body: {
          query: `
            query getPokemon($name: String!) {
              pokemon(name: $name) {
                id
                name
                height
                weight
                sprites {
                  front_default
                }
                types {
                  type {
                    name
                  }
                }
                stats {
                  stat{
                    name        
                  }
                  base_stat
                }
              }
            }
          `,
          variables: { name },
        },
      }),
      transformResponse: (response: any) => response.data.pokemon,
    }),
    getAllPokemons: builder.query({
      query: ({ limit, offset }) => ({
        url: "",
        method: "POST",
        body: {
          query: `
            query getPokemons($limit: Int!, $offset: Int!) {
              pokemons(limit: $limit, offset: $offset) {
                results {
                  id
                  name
                  image
                }
              }
            }
          `,
          variables: { limit, offset },
        },
      }),
      transformResponse: (response: any) => response.data.pokemons.results,
    }),
  }),
});

export const { useGetPokemonByNameQuery, useGetAllPokemonsQuery } = pokeApi;
