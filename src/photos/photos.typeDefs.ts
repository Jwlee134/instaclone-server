import { gql } from "apollo-server-express";

export default gql`
  type Photo {
    id: Int!
    owner: User
    file: String!
    caption: String
    hashtags: [HashTag]
    createdAt: String!
    updatedAt: String!
  }
  type HashTag {
    id: Int!
    hashTag: String!
    photos: [Photo]
    createdAt: String!
    updatedAt: String!
  }
`;
