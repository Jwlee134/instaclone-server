import { gql } from "apollo-server";

export default gql`
  type LoginResult {
    isSuccess: Boolean!
    token: String
    error: String
  }
  type Mutation {
    login(username: String!, password: String!): LoginResult
  }
`;
