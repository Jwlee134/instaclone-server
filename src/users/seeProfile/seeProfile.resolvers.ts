import client from "../../client";

export default {
  Query: {
    seeProfile: async (root: any, { username }: any) => {
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
