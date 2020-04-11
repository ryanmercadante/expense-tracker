import { AuthenticationError, UserInputError } from 'apollo-server'
import bcrypt from 'bcryptjs'

import Organization from '../models/Organization'
import User from '../models/User'

class OrganizationService {
  static async createOrganization(name, password, user) {
    try {
      // check for user
      if (!user) {
        throw new AuthenticationError(
          'You must have a user account to create an organization',
        )
      }

      // check to see if organization already exists
      const organization = await Organization.findOne({ name })
      if (organization) {
        throw new UserInputError(
          'Organization already exists. Use a different name.',
        )
      }

      // hash password and add user as admin and member to organization
      const hashedPassword = await bcrypt.hash(password, 12)
      const newOrganization = new Organization({
        name,
        password: hashedPassword,
        admin: user.id,
        members: [user.id],
        createdAt: new Date().toISOString(),
      })

      // add organization Id to user array of organizations
      const localUser = await User.findById(user.id)
      localUser.organizationIds.push(newOrganization._id)
      await localUser.save()

      return await newOrganization.save()
    } catch (err) {
      console.error('Something went wrong creating organization:', err)
      throw new Error(err)
    }
  }

  static async joinOrganization(name, password, user) {
    try {
      // check for user
      if (!user) {
        throw new AuthenticationError(
          'You must have a user account to create an organization',
        )
      }

      // check database for organization name and password
      const organization = await Organization.findOne({ name })
      const match = await bcrypt.compare(password, organization.password)
      if (!match) {
        throw new UserInputError('Incorrect organization credentials')
      }

      // if already a member of organization, return org unmodified
      if (organization.members.includes(user.id)) {
        return organization
      }

      // add user to members array
      organization.members.push(user.id)
      await organization.save()
      return organization
    } catch (err) {
      console.error('Something went wrong joining organization:', err)
      throw new Error(err)
    }
  }
}

export default OrganizationService
