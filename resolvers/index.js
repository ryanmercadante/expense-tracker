import { organizationResolvers } from './organization'

export const resolvers = {
  Query: {},
  Mutation: {
    ...organizationResolvers.Mutation,
  },
}
