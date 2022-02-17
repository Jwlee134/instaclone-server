import { Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";

const resolvers: Resolvers = {
  Mutation: {
    uploadPhoto: protectedResolver(
      async (root, { file, caption }, { loggedInUser, client }) => {
        if (caption) {
        }
      }
    ),
  },
};

export default resolvers;
