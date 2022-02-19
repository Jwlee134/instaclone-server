import { User } from "@prisma/client";
import { Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";

const resolvers: Resolvers = {
  Mutation: {
    toggleLike: protectedResolver(
      async (root, { id }, { client, loggedInUser }) => {
        const photo = await client.photo.findUnique({ where: { id } });
        if (!photo) {
          return { isSuccess: false, error: "Cannot find photo." };
        }
        const like = await client.like.findUnique({
          where: {
            photoId_userId: { photoId: id, userId: (loggedInUser as User).id },
          },
        });
        if (like) {
          await client.like.delete({ where: { id: like.id } });
        } else {
          await client.like.create({
            data: {
              user: { connect: { id: (loggedInUser as User).id } },
              photo: { connect: { id } },
            },
          });
        }
        return { isSuccess: true };
      }
    ),
  },
};

export default resolvers;
