import { ApolloServer } from 'apollo-server'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'

import typeDefs from './typedefs'
import { resolvers } from './resolvers'
import { PORT, MONGO_URI, SECRET_KEY } from './config/config'

const getUserWIthToken = (tokenWithBearer) => {
  if (tokenWithBearer) {
    const token = tokenWithBearer.split('Bearer ')[1]
    return jwt.verify(token, SECRET_KEY)
  }
  return null
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization || ''
    const user = getUserWIthToken(token)
    return { user }
  },
})

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  })
  .then(() => {
    console.log('MongoDB connected!')
    return server.listen({ port: PORT })
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`)
  })
