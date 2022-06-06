import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Post {
    id: ID!
    body: String!
    username: String!
  }
  type Query {
    getPosts: [Post]
  }

  type User {
    id: ID!
    email: String!
    username: String!
    password: String!
    token: String!
    createdAt: String
    updatedAt: String
  }

  input RegisterInput {
    username: String!
    email: String!
    password: String!
    confirmedPassword: String!
  }

  input UpdateUserInput {
    username: String
    email: String
    password: String
  }

  type Mutation {
    registerUser(registerInput: RegisterInput): User!
    loginUser(username: String!, password: String!): User!
    updateUser(updateUserInput: UpdateUserInput): User!
  }
`;
