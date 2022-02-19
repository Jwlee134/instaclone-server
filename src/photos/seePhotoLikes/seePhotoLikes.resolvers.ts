import { User } from "@prisma/client";
import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    seePhotoLikes: async (root, { id, lastId }, { client }) => {
      const like = (await client.like.findMany({
        where: { photoId: id },
        select: { user: true },
        take: 5,
        ...(lastId && {
          skip: 1,
          cursor: { photoId_userId: { photoId: id, userId: lastId } },
        }),
      })) as unknown as { user: User }[];
      return like.map((value) => value.user);
    },
  },
};

export default resolvers;
