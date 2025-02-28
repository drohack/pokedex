import { useQuery } from "@tanstack/react-query";
import { fetchPokemonData } from "../api/pokeapi/pokeapi";
import { Regions } from "../utils";
import { selectRegion } from "../features/regions/regionsSlice";
import { useSelector } from "react-redux";

export const usePokemonData = () => {
  const region = useSelector(selectRegion);

  return useQuery({
    queryKey: ["pokemon", region],
    queryFn: () => fetchPokemonData(region),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useKantoPokemonData = () => {
  const region = 'KANTO';

  return useQuery({
    queryKey: ["pokemon", region],
    queryFn: () => fetchPokemonData(region),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};