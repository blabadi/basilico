import gql from 'graphql-tag'

const baseTypes = gql`
  interface Entity {
    id: ID
  }

  type User implements Entity {
    id: ID
    firstname: String
    lastname: String
  }

  input UserInput {
    firstname: String
    lastname: String
  }
`

export const typeDefs = [baseTypes]
