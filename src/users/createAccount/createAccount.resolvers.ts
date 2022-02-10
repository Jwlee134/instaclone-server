import bcrypt from "bcrypt";
import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Mutation: {
    createAccount: async (
      root,
      { firstName, lastName, username, email, password },
      { client }
    ) => {
      const user = await client.user.findFirst({
        where: { OR: [{ username }, { email }] },
      });
      if (user) {
        return {
          isSuccess: false,
          error: "This username/email is already taken.",
        };
      }
      const hashedPw = await bcrypt.hash(password, 10);
      await client.user.create({
        data: { username, email, password: hashedPw, firstName, lastName },
      });
      return { isSuccess: true };
    },
  },
};

export default resolvers;
