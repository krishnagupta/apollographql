import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { makeExecutableSchema } from 'graphql-tools'
import { SchemaLink } from 'apollo-link-schema'
import { withClientState } from 'apollo-link-state';

import defaults from './defaults'
import schema from './schema'
import localresolver from './localresolver'
import remoteresolver from './remoteresolver'

const cache = new InMemoryCache()

const graphQLSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers: remoteresolver
})

const stateLink = withClientState({
  cache,
  defaults: defaults,
  resolvers: localresolver
})

const middleWareLink = new ApolloLink((operation, forward) => {
  if (operation.variables) {
    const omitTypename = (key, value) => (key === '__typename' ? undefined : value)
    operation.variables = JSON.parse(JSON.stringify(operation.variables), omitTypename)
  }
  return forward(operation)
})

const link = ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          ),
        );
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    middleWareLink,
    stateLink,
    new SchemaLink({ schema: graphQLSchema })
  ])

  function dataIdFromObject(result) {
    if (result.__typename) {
      if (result.id !== undefined) {
        return `${result.__typename}:${result.id}`
      }
    }
    return null
  }
  
const client = new ApolloClient({
  dataIdFromObject,
  cache,
  link
})

// cache.writeData({
//     data: defaults
//   })


export { client }