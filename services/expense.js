import Organization from '../models/Organization'
import { AuthenticationError, UserInputError } from 'apollo-server'

class ExpenseService {
  static async getExpenses(orgName, user) {
    try {
      // check for user
      if (!user) {
        throw new AuthenticationError(
          'You must have a user account and be part of an organization to see expenses',
        )
      }

      const organization = await Organization.findOne({ name: orgName })
      if (!organization) {
        throw new UserInputError("That organization doesn't exist")
      }

      // make sure user is part of org
      if (!organization.members.includes(user.id)) {
        throw new AuthenticationError(
          'User is not part of organization. Cannot get expenses',
        )
      }

      return organization.expenses
    } catch (err) {
      console.error('Error getting expenses for that organization:', err)
      throw new Error(err)
    }
  }

  static async addExpense(orgName, expense, user) {
    try {
      // check for user
      if (!user) {
        throw new AuthenticationError(
          'You must have a user account and be part of an organization to add an expense',
        )
      }

      const organization = await Organization.findOne({ name: orgName })
      if (!organization) {
        throw new UserInputError("That organization doesn't exist")
      }

      // make sure user is part of org
      if (!organization.members.includes(user.id)) {
        throw new AuthenticationError(
          'User is not part of organization. Cannot get expenses',
        )
      }
    } catch (err) {
      console.error('Error creating expense for that organization:', err)
      throw new Error(err)
    }
  }
}

export default ExpenseService
