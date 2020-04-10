import { gql } from 'apollo-server'

export const typeDefs = gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }
`

// export const {
//   typeDefs: root,
// }
