import { organizationResolvers } from './organization'
import { userResolvers } from './user'

export const resolvers = {
  Query: {},
  Mutation: {
    ...organizationResolvers.Mutation,
    ...userResolvers.Mutation,
  },
}
