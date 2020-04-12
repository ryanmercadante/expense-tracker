import { organizationResolvers } from './organization'
import { userResolvers } from './user'
import { expenseResolvers } from './expense'

export const resolvers = {
  Query: {
    ...organizationResolvers.Query,
    ...userResolvers.Query,
    ...expenseResolvers.Query,
  },
  Mutation: {
    ...organizationResolvers.Mutation,
    ...userResolvers.Mutation,
    ...expenseResolvers.Mutation,
  },
}
