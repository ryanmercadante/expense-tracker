import { ApolloServer } from 'apollo-server'
import typeDefs from './typedefs'
import { resolvers } from './resolvers'

import { PORT } from './config/config'

console.log(PORT)

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen({ port: PORT }).then((res) => {
  console.log(`Server running at ${res.url}`)
})
