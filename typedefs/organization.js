import { gql } from 'apollo-server'

export const organizationTypeDefs = gql`
  type Organization {
    id: ID!
    name: String!
    createdAt: String!
    updatedAt: String
  }

  extend type Mutation {
    createOrganization(name: String!): Organization!
  }
`
