import 'reflect-metadata'
import { createConnection } from 'typeorm'
import { ApolloServer } from 'apollo-server'
import { buildSchema } from 'type-graphql'
import { UserResolver } from './resolver/UserResolver'

const bootstrap = async () => {
  const schema = await buildSchema({
    resolvers: [UserResolver],
  })

  const server = new ApolloServer({
    schema,
  })

  await createConnection()

  const { url } = await server.listen(3001)
  console.log(`Server is running, GraphQL Playground available at ${url}`)
}

bootstrap()
