import 'reflect-metadata'
import env, { SERVER_BASE_URL } from 'env'
import * as Hapi from 'hapi'
import { makeExecutableSchema } from 'graphql-tools'
import { ApolloServer } from 'apollo-server-hapi'
import { App } from 'App'
import { setupConnection } from 'connections/typeorm'
const {
 CLIENT_BASE_URL,
 SERVER_PORT,
 SERVER_GRAPHQL_ENDPOINT
} = env
import { GraphQLModule } from '@graphql-modules/core'
import {
 CollectionModule,
 ThingModule
} from 'modules'

const App = new GraphQLModule({
 imports: [CollectionModule, ThingModule]
})

async function StartServer() {
 await setupConnection()

 const app = new Hapi.Server({
  port: SERVER_PORT
 })

 const {
  typeDefs,
  resolvers,
  schemaDirectives,
  context
 } = App.forRoot({})

 const server = new ApolloServer({
  typeDefs,
  resolvers,
  schemaDirectives,
  context
 })

 await server.applyMiddleware({
  app,
  path: `/${SERVER_GRAPHQL_ENDPOINT}`,
  cors: {
   origin: [CLIENT_BASE_URL],
   credentials: true
  }
 })

 await server.installSubscriptionHandlers(
  app.listener
 )

 app.start().then(() => {
  console.log('🚀 Server ready')
 })
}

StartServer().catch(error => {
 console.error(error)
})
