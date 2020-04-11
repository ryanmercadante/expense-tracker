import { gql } from 'apollo-server'

export const userTypeDefs = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    token: String!
    organizationId: ID
    createdAt: String!
    updatedAt: String
  }

  enum UserRole {
    MEMBER # member of an organization
    ADMIN # admin of an organization
  }

  input RegisterInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    confirmPassword: String!
  }

  extend type Mutation {
    register(registerInput: RegisterInput!): User!
  }
`
