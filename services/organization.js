import Organization from '../models/organization'

class OrganizationService {
  static async createOrganization(name) {
    try {
      const newOrganization = new Organization({
        name,
        createdAt: new Date().toISOString(),
      })
      const organization = await newOrganization.save()
      return organization
    } catch (err) {
      console.error('Something went wrong creating organization:', err)
      throw new Error(err)
    }
  }
}

export default OrganizationService
