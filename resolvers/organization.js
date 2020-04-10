import OrganizationService from '../services/organization'

export const organizationResolvers = {
  Query: {},
  Mutation: {
    createOrganization: async (_, { name }) =>
      OrganizationService.createOrganization(name),
  },
}
