import { gql } from "apollo-server-express";

export default gql`
  type UnfollowUserResult {
    isSuccess: Boolean!
    error: String
  }
  type Mutation {
    unfollowUser(username: String!): UnfollowUserResult
  }
`;
