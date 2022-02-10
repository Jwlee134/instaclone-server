import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    seeFollowers: async (root, { username, page }, { client }) => {
      const followers = await client.user
        .findUnique({ where: { username } })
        .followers({ skip: (page - 1) * 5, take: 5 });
      return { isSuccess: true, followers };
    },
  },
};

export default resolvers;
