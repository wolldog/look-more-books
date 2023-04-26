const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    savedBooks: [Book]
  }

  type Book {
    _id: ID
    description: String
    bookID: String
    image: String
    link: String
    title: String
    authors: [String]
  }

  # Auth type to handle returning data from creating or logging in a user.
  type Auth {
    token: ID!
    user: User
  }

  type Query {
    getMe: User
  }

  type Mutation {
    # Set up mutations to handle creating a profile or logging into a profile and return Auth type
    createUser(username: String!, email: String!, password: String!): Auth
    loginUser(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
