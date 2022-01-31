import client from "../client";
import bcrypt from "bcrypt";

export default {
  Mutation: {
    createAccount: async (
      root: any,
      { firstName, lastName, username, email, password }: any
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
    login: async (root: any, { username, password }: any) => {
      const user = await client.user.findUnique({ where: { username } });
      if (!user) {
        return { isSuccess: false, error: "This user does not exist." };
      }
      const isCorrectPw = await bcrypt.compare(password, user.password);
      if (!isCorrectPw) {
        return { isSuccess: false, error: "This password is incorrect." };
      }
    },
  },
};
