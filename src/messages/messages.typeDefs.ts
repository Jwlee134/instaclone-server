import { gql } from "apollo-server-express";

export default gql`
  type Room {
    id: Int!
    users: [User]
    messages(lastId: Int): [Message]
    createdAt: String!
    updatedAt: String!
  }
  type Message {
    id: Int!
    text: String!
    user: User!
    room: Room!
    createdAt: String!
    updatedAt: String!
  }
`;
