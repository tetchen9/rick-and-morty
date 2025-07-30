import { ApolloClient, InMemoryCache } from '@apollo/client'

/**
 * ApolloClient is a client for the Apollo GraphQL server.
 * @returns A new ApolloClient instance 
 * with the GraphQL server URI and an in-memory cache.
 */
const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql',
  cache: new InMemoryCache(),
})

export default client
