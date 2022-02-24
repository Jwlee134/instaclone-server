import { Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";

const resolvers: Resolvers = {
  Mutation: {
    editComment: protectedResolver(
      async (root, { id, text }, { client, loggedInUser }) => {
        const photo = await client.photo.findFirst({
          where: { comments: { some: { id } } },
          select: { id: true },
        });
        if (!photo) {
          return { isSuccess: false, error: "Cannot find photo." };
        }
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
        await client.comment.update({ where: { id }, data: { text } });
        return { isSuccess: true };
      }
    ),
  },
};

export default resolvers;
