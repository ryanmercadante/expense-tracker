import { gql } from 'apollo-server'

export const expenseTypeDefs = gql`
  type Expense {
    id: ID!
    title: String!
    description: String
    price: Float!
    userId: ID!
    organizationId: ID!
    createdAt: String!
    updatedAt: String
  }

  input ExpenseInput {
    title: String!
    description: String
    price: Float!
    userId: String
  }

  extend type Query {
    getExpenses(orgId: String!): [Expense!]!
  }

  extend type Mutation {
    addExpense(orgName: String!, expense: ExpenseInput!): Expense!
    updateExpense(expenseId: String!, expense: ExpenseInput!): Expense!
  }
`
