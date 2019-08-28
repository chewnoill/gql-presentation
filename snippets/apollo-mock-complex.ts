import { ApolloServer, gql } from 'apollo-server'

const typeDefs = gql`
type Query {
  hello: String
}
`;

const mocks = {
  Query: () =>({
    hello: () => "hello world",
  }),
}

const server = new ApolloServer({
  typeDefs,
  mocks,
})

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
})
