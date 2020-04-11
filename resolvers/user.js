import UserService from '../services/organization'

export const userResolvers = {
  Query: {},
  Mutation: {
    register: async (_, { registerInput }) =>
      UserService.register(registerInput),
  },
}
