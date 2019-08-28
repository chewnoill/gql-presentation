import { Module } from '../types'

export default async (): Promise<Module> => ({
    document: gql`
        type CollectionQuery {
            get(
            ): Collection
        }

        type CollectionInput {
            id: ID!
        }

        type Collection {
            id: ID!
            things: [Thing!]!
        }
    `,
    resolvers: {
        CollectionQuery: {
            get: async (
                _,
                { input },
                { collectionLoader }
            ) => {
                if (!input) {
                    return null
                }
                return collectionLoader.load({
                    id: parseInt(input.id),
                })
            },
        },
        Collection: {
            id: p => `${p.id}`,
            things: async p => await p.things,
        },
    },
})
