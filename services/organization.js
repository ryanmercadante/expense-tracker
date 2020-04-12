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
          'You must have a user account to join an organization',
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

  static async leaveOrganization(name, user) {
    try {
      // check for user
      if (!user) {
        throw new AuthenticationError(
          'You must have a user account to leave an organization',
        )
      }

      // find organization and user
      const [organization, localUser] = await Promise.all([
        Organization.findOne({ name }),
        User.findById(user.id),
      ])

      if (!organization) {
        throw new UserInputError('Could not find organization')
      } else if (organization.admin.toString() === user.id) {
        throw new UserInputError(
          'Cannot leave organization without reassigning admin role',
        )
      }

      // filter out user from org
      organization.members = organization.members.filter(
        (memberId) => memberId.toString() !== user.id,
      )
      // filter out org from user
      localUser.organizationIds = localUser.organizationIds.filter(
        (orgId) => orgId.toString() !== organization._id.toString(),
      )

      // save changes to database
      await Promise.all([organization.save(), localUser.save()])

      return organization
    } catch (err) {
      console.error('Something went wrong leaving organization:', err)
      throw new Error(err)
    }
  }

  static async changeAdmin(name, newAdminId, user) {
    try {
      // check for user
      if (!user) {
        throw new AuthenticationError(
          'You must have a user account to change an admin of an organization',
        )
      }

      // find organization and newAdmin
      const [organization, newAdmin] = await Promise.all([
        Organization.findOne({ name }),
        User.findById(newAdminId),
      ])

      if (!organization) {
        throw new UserInputError('Could not find organization')
      }

      // make sure current user is admin
      if (user.id !== organization.admin.toString()) {
        throw new Error('You are not the admin. Cannot reassign admin status.')
      }

      // Make sure other memebers exist
      if (organization.members.length === 1) {
        throw new Error(
          'You are the only member of the organization. Cannot reassign admin status.',
        )
      }

      // Check for newAdminId in members list
      const memberExists = organization.members.find(
        (memberId) => memberId.toString() === newAdmin._id.toString(),
      )
      if (!memberExists) {
        throw new UserInputError('That member is not part of the organization')
      }

      // make sure newAdmin is not already admin
      if (organization.admin.toString() === newAdmin._id.toString()) {
        throw new UserInputError('You are already the admin')
      }

      // update organization with new admin
      const updatedOrganization = await Organization.findOneAndUpdate(
        { name },
        {
          $set: {
            admin: newAdmin._id,
          },
        },
        {
          new: true,
        },
      )

      return updatedOrganization
    } catch (err) {
      console.error('Something went wrong changing organization admin:', err)
      throw new Error(err)
    }
  }
}

export default OrganizationService
