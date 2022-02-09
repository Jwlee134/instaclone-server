import { gql } from "apollo-server-express";

export default gql`
  scalar Upload
  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }
  type EditProfileResult {
    isSuccess: Boolean!
    error: String
  }
  type Mutation {
    editProfile(
      firstName: String
      lastName: String
      username: String
      email: String
      password: String
      bio: String
      avatar: Upload
    ): EditProfileResult
  }
`;
