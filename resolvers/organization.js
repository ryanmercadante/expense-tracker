import OrganizationService from '../services/organization'

export const organizationResolvers = {
  Query: {},
  Mutation: {
    createOrganization: async (_, { name, password }, { user }) =>
      OrganizationService.createOrganization(name, password, user),
    joinOrganization: async (_, { name, password }, { user }) =>
      OrganizationService.joinOrganization(name, password, user),
  },
}
