import { gql } from "apollo-server";

export default gql`
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
    ): EditProfileResult
  }
`;