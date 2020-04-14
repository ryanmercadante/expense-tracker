import { AuthenticationError, UserInputError } from 'apollo-server'

import Organization from '../models/Organization'
import User from '../models/User'
import Expense from '../models/Expense'

class ExpenseService {
  static async getExpenses(orgId, user) {
    try {
      // check for user
      if (!user) {
        throw new AuthenticationError(
          'You must have a user account and be part of an organization to see expenses',
        )
      }

      const [expenses, organization] = await Promise.all([
        Expense.find({ organizationId: orgId }),
        Organization.findById(orgId),
      ])

      if (!organization) {
        throw new UserInputError("That organization doesn't exist")
      }

      // make sure user is part of org
      if (!organization.members.includes(user.id.toString())) {
        throw new AuthenticationError(
          'User is not part of organization. Cannot get expenses',
        )
      }

      return expenses
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

      const [organization, localUser] = await Promise.all([
        Organization.findOne({ name: orgName }),
        User.findById(user.id),
      ])
      if (!organization) {
        throw new UserInputError("That organization doesn't exist")
      }

      // make sure user is part of org
      if (!organization.members.includes(user.id)) {
        throw new AuthenticationError(
          'User is not part of organization. Cannot get expenses',
        )
      }

      const newExpense = new Expense({
        ...expense,
        userId: user.id,
        organizationId: organization._id,
        createdAt: new Date().toString(),
      })

      // push expense id onto organization array of expenses
      organization.expenses.push(newExpense._id)

      await Promise.all([organization.save(), newExpense.save()])

      return newExpense
    } catch (err) {
      console.error('Error creating expense for that organization:', err)
      throw new Error(err)
    }
  }

  static async updateExpense(expenseId, expense, user) {
    try {
      // check for user
      if (!user) {
        throw new AuthenticationError(
          'You must have a user account and be part of an organization to add an expense',
        )
      }

      // check if user created expense
      if (user.id !== expense.userId) {
        throw new AuthenticationError(
          'Cannot update an expense that you did not create',
        )
      }

      const updatedExpense = await Expense.findByIdAndUpdate(
        expenseId,
        {
          $set: {
            ...expense,
            updatedAt: new Date().toString(),
          },
        },
        {
          new: true,
        },
      )
      if (!updatedExpense) {
        throw new UserInputError('Could not find expense with that Id')
      }

      return {
        ...updatedExpense._doc,
        id: updatedExpense._id,
      }
    } catch (err) {
      console.error('Error updating expense for that organization:', err)
      throw new Error(err)
    }
  }
}

export default ExpenseService
