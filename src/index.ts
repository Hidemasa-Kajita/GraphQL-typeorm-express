import 'reflect-metadata'
import { createConnection, Repository, useContainer } from 'typeorm'
import { ApolloServer } from 'apollo-server'
import { buildSchema } from 'type-graphql'
import { UserQueryResolver } from './resolver/user/UserQueryResolver'
import { UserMutationResolver } from './resolver/user/UserMutationResolver'
import Container from 'typedi'
import { UserRepository } from './repository/UserRepository'
import { User } from './entity/User'

const bootstrap = async () => {
  const schema = await buildSchema({
    resolvers: [UserQueryResolver, UserMutationResolver],
  })

  const server = new ApolloServer({
    schema,
  })

  await createConnection()

  const { url } = await server.listen(3001)
  console.log(`Server is running, GraphQL Playground available at ${url}graphql`)
}

bootstrap()
