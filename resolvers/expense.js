import ExpenseService from '../services/expense'

export const expenseResolvers = {
  Query: {
    getExpenses: (_, { orgName }, { user }) =>
      ExpenseService.getExpenses(orgName, user),
  },
  Mutation: {
    addExpense: (_, { orgName, expenseInput }, { user }) =>
      ExpenseService.addExpense(orgName, expenseInput, user),
  },
}
