import { ApolloClient, InMemoryCache } from '@apollo/client';
import { GRAPHQL_URL, SHOULD_CONNECT_TO_DEV_TOOL } from '../../config.json';
console.log('[GRAPHQL]: Initializing the ApolloClient');
const client = new ApolloClient({
    uri: GRAPHQL_URL,
    cache: new InMemoryCache(),
    connectToDevTools: SHOULD_CONNECT_TO_DEV_TOOL,
});
export default client;
