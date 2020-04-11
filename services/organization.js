import { AuthenticationError } from 'apollo-server'
import bcrypt from 'bcryptjs'

import Organization from '../models/Organization'

class OrganizationService {
  static async createOrganization(name, password, user) {
    try {
      // check for user
      if (!user) {
        throw new AuthenticationError(
          'You must have a user account to create an organization',
        )
      }

      // hash password
      const hashedPassword = await bcrypt.hash(password, 12)
      const newOrganization = new Organization({
        name,
        password: hashedPassword,
        admin: user.id,
        members: [user.id],
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
