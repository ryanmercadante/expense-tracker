import { ApolloServer } from 'apollo-server'
import mongoose from 'mongoose'

import typeDefs from './typedefs'
import { resolvers } from './resolvers'

import { PORT, MONGO_URI } from './config/config'

console.log(PORT)

const server = new ApolloServer({
  typeDefs,
  resolvers,
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
