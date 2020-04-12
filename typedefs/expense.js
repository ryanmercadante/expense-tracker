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
  }

  extend type Query {
    getExpenses(orgName: String!): [Expense!]!
  }

  extend type Mutation {
    addExpense(orgName: String!, expense: ExpenseInput!): Expense!
  }
`
