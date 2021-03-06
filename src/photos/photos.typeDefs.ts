import { gql } from "apollo-server-express";

export default gql`
  type Photo {
    id: Int!
    owner: User
    file: String!
    caption: String
    likes: Int!
    numOfComments: Int!
    comments: [Comment]
    hashtags: [Hashtag]
    createdAt: String!
    updatedAt: String!
    isMine: Boolean!
    isLiked: Boolean!
  }
  type Hashtag {
    id: Int!
    hashtag: String!
    photos(lastId: Int): [Photo]
    totalPhotos: Int!
    createdAt: String!
    updatedAt: String!
  }
  type Like {
    id: Int!
    photo: Photo!
    createdAt: String!
    updatedAt: String!
  }
`;
