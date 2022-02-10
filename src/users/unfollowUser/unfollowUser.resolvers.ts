import { Resolvers } from "../../types";
import { protectedResolver } from "../users.utils";

const resolvers: Resolvers = {
  Mutation: {
    unfollowUser: protectedResolver(
      async (root, { username }, { loggedInUser, client }) => {
        const targetUser = await client.user.findUnique({
          where: { username },
        });
        if (!targetUser) {
          return { isSuccess: false, error: "Cannot find user." };
        }
        await client.user.update({
          where: { id: loggedInUser?.id },
          data: { following: { disconnect: { username } } },
        });
        return { isSuccess: true };
      }
    ),
  },
};

export default resolvers;
