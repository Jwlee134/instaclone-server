import { Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";

const resolvers: Resolvers = {
  Mutation: {
    createComment: protectedResolver(
      async (root, { id, text }, { client, loggedInUser }) => {
        console.log(id, text);
        const photo = await client.photo.findUnique({
          where: { id },
          select: { id: true },
        });
        if (!photo) {
          return { isSuccess: false, error: "Cannot find photo." };
        }
        await client.comment.create({
          data: {
            text,
            photo: { connect: { id } },
            user: { connect: { id: loggedInUser?.id } },
          },
        });
        return { isSuccess: true };
      }
    ),
  },
};

export default resolvers;
