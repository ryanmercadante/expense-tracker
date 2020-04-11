import { gql } from 'apollo-server'

export const organizationTypeDefs = gql`
  type Organization {
    id: ID!
    name: String!
    password: String!
    admin: ID!
    members: [ID!]!
    createdAt: String!
    updatedAt: String
  }

  extend type Mutation {
    createOrganization(name: String!, password: String!): Organization!
    joinOrganization(name: String!, password: String!): Organization!
  }
`
