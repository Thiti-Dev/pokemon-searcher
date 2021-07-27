import { DocumentNode } from '@apollo/client';
import client from './index';

/**
 * @NOTE For the one that wanna fetch the query without using directly from hook
 * 
 * @param $gql 
 * 
 * @returns ApolloQueryResult
 * 
 * @Example
 * 
 * ```ts
 *   useEffect(() => {
    (async() => {
      const data = await APOLLO_query(gql`
      {
          pokemons(first: -1) {
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
  `);
    })()

  },[])
 * ```
 */
export function APOLLO_query($gql: DocumentNode) {
    return Promise.resolve(
        client
            .query({
                query: $gql,
            })
            .then((result) => result),
    );
}
