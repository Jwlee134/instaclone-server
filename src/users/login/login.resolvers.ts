import client from "../../client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default {
  Mutation: {
    login: async (root: any, { username, password }: any) => {
      const user = await client.user.findUnique({ where: { username } });
      if (!user) {
        return { isSuccess: false, error: "This user does not exist." };
      }
      const isCorrectPw = await bcrypt.compare(password, user.password);
      if (!isCorrectPw) {
        return { isSuccess: false, error: "This password is incorrect." };
      }
      const token = jwt.sign(user.id.toString(), process.env.PRIVATE_KEY!);
      return { isSuccess: true, token };
    },
  },
};
