import client from "../client";

export default {
  Mutation: {
    createAccount: async (
      root: any,
      { firstName, lastName, username, email, password }: any
    ) => {
      const user = await client.user.findFirst({
        where: { OR: [{ username }, { email }] },
      });
      if (user) {
        console.log("user exists");
      }
    },
  },
};
