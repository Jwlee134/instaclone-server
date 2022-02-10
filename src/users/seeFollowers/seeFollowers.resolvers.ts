import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    seeFollowers: async (root, { username, page }, { client }) => {
      const targetUser = await client.user.findUnique({
        where: { username },
        select: { id: true },
      });
      if (!targetUser) {
        return { isSuccess: false, error: "Cannot find user." };
      }
      const followers = await client.user
        .findUnique({ where: { username } })
        .followers({ skip: (page - 1) * 5, take: 5 });
      const totalFollowers = await client.user.count({
        where: { following: { some: { username } } },
      });
      return {
        isSuccess: true,
        followers,
        totalFollowers,
        totalPages: Math.ceil(totalFollowers / 5),
      };
    },
  },
};

export default resolvers;
