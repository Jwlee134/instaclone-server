import bcrypt from "bcrypt";
import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Mutation: {
    createAccount: async (
      root,
      { firstName, lastName, username, email, password },
      { client }
    ) => {
      try {
        const user = await client.user.findFirst({
          where: { OR: [{ username }, { email }] },
        });
        if (user) {
          throw new Error("This username/email is already taken.");
        }
        const hashedPw = await bcrypt.hash(password, 10);
        return client.user.create({
          data: { username, email, password: hashedPw, firstName, lastName },
        });
      } catch (error) {
        return error;
      }
    },
  },
};

export default resolvers;
