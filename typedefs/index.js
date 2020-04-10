import { gql } from 'apollo-server'
import { organizationTypeDefs } from './organization'

const typeDefs = gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }
`
export default [typeDefs, organizationTypeDefs]
