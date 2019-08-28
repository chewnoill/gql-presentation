require('./connectors/env')

import * as gqlLoader from '@creditkarma/graphql-loader'
import { ApolloServer } from 'apollo-server-hapi'

async function StartServer() {
    const schema = await gqlLoader.executableSchemaFromModules(
        [
            await buildModule1(),
            await buildModule2(),
            await buildRoot(),
        ]
    )

    const app = new Hapi.Server({
        port: 4000,
    })

    const server = new ApolloServer({
        schema,
        context: async ({ request }) =>
            await buildContext(request),
    })

    await server.applyMiddleware({
        app,
        path: '/graphql',
        cors: {
            origin: [
                process.env.client_base_url!,
            ],
            credentials: true,
        },
    })

    await server.installSubscriptionHandlers(
        app.listener
    )

    await app.start()
}

StartServer().catch(error => {
    console.error(error)
    throw error
})
