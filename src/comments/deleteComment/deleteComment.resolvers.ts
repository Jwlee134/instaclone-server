import { Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";

const resolvers: Resolvers = {
  Mutation: {
    deleteComment: protectedResolver(
      async (root, { id }, { client, loggedInUser }) => {
        const comment = await client.comment.findUnique({
          where: { id },
          select: { userId: true },
        });
        if (!comment) {
          return { isSuccess: false, error: "Cannot find comment." };
        }
        if (comment.userId !== loggedInUser?.id) {
          return { isSuccess: false, error: "You are not the owner." };
        }
        await client.comment.delete({ where: { id } });
        return { isSuccess: true };
      }
    ),
  },
};

export default resolvers;
