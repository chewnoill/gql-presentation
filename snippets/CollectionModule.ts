import {
 GraphQLModule,
 ModuleContext
} from '@graphql-modules/core'
import {
 Injectable,
 ProviderScope
} from '@graphql-modules/di'
import gql from 'graphql-tag'
import { Collection } from 'entity/Collection'


const typeDefs = gql`
 type Query {
  collections: [Collection!]!
 }

 type Collection {
  id: ID!
 }
`

const resolvers = {
 Query: {
  collections: (_, __, { injector }) =>
   injector
    .get(CollectionProvider)
    .getCollections()
 }
}

@Injectable({ scope: ProviderScope.Application })
export class CollectionProvider {
  connection: Connection
  constructor() {
    this.connection = getConnection()
  }

  getCollections() {
    return this.connection.manager
      .createQueryBuilder()
      .select('collection')
      .from(Collection, 'collection')
      .getMany()
  }
}

export const CollectionModule = new GraphQLModule(
 {
  typeDefs,
  resolvers,
  providers: [CollectionProvider]
 }
)
