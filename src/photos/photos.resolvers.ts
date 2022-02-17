import { Resolvers } from "../types";

const resolvers: Resolvers = {
  Photo: {
    owner: ({ userId }, args, { client }) =>
      client.user.findUnique({ where: { id: userId } }),
    hashtags: ({ id }, args, { client }) =>
      client.hashtag.findMany({ where: { photos: { some: { id } } } }),
  },
};

export default resolvers;
