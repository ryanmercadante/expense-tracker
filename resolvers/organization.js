import OrganizationService from '../services/organization'

export const organizationResolvers = {
  Query: {},
  Mutation: {
    createOrganization: async (_, { name, password }, { user }) =>
      OrganizationService.createOrganization(name, password, user),
    joinOrganization: async (_, { name, password }, { user }) =>
      OrganizationService.joinOrganization(name, password, user),
    leaveOrganization: async (_, { name }, { user }) =>
      OrganizationService.leaveOrganization(name, user),
    changeAdmin: async (_, { name, newAdminId }, { user }) =>
      OrganizationService.changeAdmin(name, newAdminId, user),
  },
}
