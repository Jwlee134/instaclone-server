import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    seeHashtag: async (root, { hashtag }, { client }) =>
      client.hashtag.findUnique({ where: { hashtag } }),
  },
};

export default resolvers;
