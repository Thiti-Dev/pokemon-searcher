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
            weight {
                maximum
                minimum
            }
            height {
                maximum
                minimum
            }
            maxHP
            maxCP
            fleeRate
            resistant
            weaknesses
            attacks {
                fast {
                    name
                    type
                    damage
                }
                special {
                    name
                    type
                    damage
                }
            }
            image
        }
    }
`;
