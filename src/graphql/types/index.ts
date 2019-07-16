import gql from 'graphql-tag'

const baseTypes = gql`
  type Query {
    user: User
  }
  type User {
    id: String
    firstname: String
    lastname: String
  }
  input UserInput {
    firstname: String
    lastname: String
  }
  type Mutation {
    createUser(user: UserInput!): User
  }
`

export const typeDefs = [baseTypes]
