import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    searchPhotos: (root, { keyword, lastId }, { client }) =>
      client.photo.findMany({
        where: { caption: { startsWith: keyword } },
        take: 5,
        ...(lastId && { skip: 1, cursor: { id: lastId } }),
      }),
  },
};

export default resolvers;
