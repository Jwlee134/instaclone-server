import { gql } from "apollo-server-express";

export default gql`
  type CreateCommentResult {
    isSuccess: Boolean!
    error: String
  }
  type Mutation {
    createComment(id: Int!, text: String!): CreateCommentResult
  }
`;
