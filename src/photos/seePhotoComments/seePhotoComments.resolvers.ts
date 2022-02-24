import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    seePhotoComments: (root, { id, lastId }, { client }) =>
      client.comment.findMany({
        where: { photoId: id },
        take: 5,
        ...(lastId && { skip: 1, cursor: { id: lastId } }),
        orderBy: { createdAt: "desc" },
      }),
  },
};

export default resolvers;
