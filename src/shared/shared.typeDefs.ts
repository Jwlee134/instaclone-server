import { gql } from "apollo-server-express";

export default gql`
  scalar Upload
  type MutationResponse {
    isSuccess: Boolean!
    error: String
    id: Int
  }
`;
