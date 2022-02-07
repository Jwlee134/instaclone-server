import client from "../../client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default {
  Mutation: {
    editProfile: async (
      root: any,
      { firstName, lastName, username, email, password, token }: any
    ) => {
      const id = jwt.verify(token, process.env.PRIVATE_KEY!);
      if (!id) {
        return { isSuccess: false, error: "Cannot update profile." };
      }
      let hashedPw = null;
      if (password) {
        hashedPw = await bcrypt.hash(password, 10);
      }
      const updatedUser = await client.user.update({
        where: { id: parseInt(id as string, 10) },
        data: {
          firstName,
          lastName,
          username,
          email,
          ...(hashedPw && { password: hashedPw }),
        },
      });
      if (updatedUser) {
        return { isSuccess: true };
      } else {
        return { isSuccess: false, error: "Cannot update profile." };
      }
    },
  },
};
