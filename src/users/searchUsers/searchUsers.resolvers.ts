import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    searchUsers: async (root, { keyword, lastKeyword }, { client }) => {
      const result = await client.user.findMany({
        where: { username: { startsWith: keyword.toLowerCase() } },
        take: 5,
        ...(lastKeyword && { skip: 1, cursor: { username: lastKeyword } }),
      });
      return result;
    },
  },
};

export default resolvers;
