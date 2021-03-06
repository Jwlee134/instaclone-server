import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    createComment(id: Int!, text: String!): MutationResponse!
  }
`;
