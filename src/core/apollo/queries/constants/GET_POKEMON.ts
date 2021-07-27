import { gql } from '@apollo/client';

export const QUERY_GET_POKEMON = gql`
    query Pokemons($pokemon_name: String!) {
        pokemon(name: $pokemon_name) {
            id
            name
            number
            classification
            types
            evolutionRequirements {
                name
                amount
            }
            evolutions {
                id
                name
                number
            }
            maxHP
            image
        }
    }
`;
