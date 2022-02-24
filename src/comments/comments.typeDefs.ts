import { gql } from "apollo-server-express";

export default gql`
  type Comment {
    id: Int!
    text: String!
    user: User!
    photo: Photo!
    isMine: Boolean!
    createdAt: String!
    updatedAt: String!
  }
`;
