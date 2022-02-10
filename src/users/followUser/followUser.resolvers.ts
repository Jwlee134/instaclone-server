import { Resolvers } from "../../types";
import { protectedResolver } from "../users.utils";

const resolvers: Resolvers = {
  Mutation: {
    followUser: protectedResolver(
      async (root, { username }, { loggedInUser, client }) => {
        const targetUser = await client.user.findUnique({
          where: { username },
        });
        if (!targetUser) {
          return { isSuccess: false, error: "Cannot find user." };
        }
        await client.user.update({
          where: { id: loggedInUser?.id },
          data: { following: { connect: { username } } },
        });
        return { isSuccess: true };
      }
    ),
  },
};

export default resolvers;
