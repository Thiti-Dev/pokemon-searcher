import { useQuery } from '@apollo/client';
import { IPokemon } from '../../../../shared/interfaces/pokemon.interface';
import { QUERY_GET_POKEMON } from '../constants/GET_POKEMON';
export function $HOOK_GetPokemonQuery(name: string) {
    return useQuery<{ pokemon: IPokemon | null }>(QUERY_GET_POKEMON, { variables: { pokemon_name: name } });
}
