import 'reflect-metadata'
import { createConnection } from 'typeorm'
import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import { buildSchema } from 'type-graphql'
import { UserQueryResolver } from '~/resolver/user/UserQueryResolver'
import { UserMutationResolver } from '~/resolver/user/UserMutationResolver'
import { PostMutationResolver } from '~/resolver/post/PostMutationResolver'
import { PostQueryResolver } from '~/resolver/post/PostQueryResolver'
import { CommentQueryResolver } from '~/resolver/comment/CommentQueryResolver'
import { CommentMutationResolver } from '~/resolver/comment/CommentMutationResolver'
import { AuthResolver } from '~/resolver/AuthResolver'

console.log('waiting...')

const bootstrap = async () => {
  const app = express()

  const schema = await buildSchema({
    resolvers: [
      AuthResolver,
      UserQueryResolver,
      UserMutationResolver,
      PostQueryResolver,
      PostMutationResolver,
      CommentQueryResolver,
      CommentMutationResolver,
    ],
  })

  const server = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res }),
  })

  await createConnection()

  await server.start()
  server.applyMiddleware({ app })

  app.listen(3001, () => {
    console.log('Express server started at localhost:3001/graphql')
  })
}

bootstrap()
