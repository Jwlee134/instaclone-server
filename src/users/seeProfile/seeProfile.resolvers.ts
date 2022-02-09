import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    seeProfile: async (root, { username }, { client }) => {
      try {
        const user = await client.user.findUnique({ where: { username } });
        if (!user) {
          throw new Error("This user does not exist.");
        }
        return user;
      } catch (error) {
        return error;
      }
    },
  },
};

export default resolvers;
