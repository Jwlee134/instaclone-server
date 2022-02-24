import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    editComment(id: Int!, text: String!): MutationResponse!
  }
`;
