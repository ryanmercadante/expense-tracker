import ExpenseService from '../services/expense'

export const expenseResolvers = {
  Query: {
    getExpenses: (_, { orgId }, { user }) =>
      ExpenseService.getExpenses(orgId, user),
  },
  Mutation: {
    addExpense: (_, { orgName, expense }, { user }) =>
      ExpenseService.addExpense(orgName, expense, user),
  },
}
