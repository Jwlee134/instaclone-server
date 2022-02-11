import { gql } from "apollo-server-express";

export default gql`
  type SeeFollowingResult {
    isSuccess: Boolean!
    error: String
    following: [User]
  }
  type Query {
    seeFollowing(username: String!, lastId: Int): SeeFollowingResult
  }
`;
