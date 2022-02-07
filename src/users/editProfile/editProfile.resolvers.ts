import client from "../../client";
import bcrypt from "bcrypt";

export default {
  Mutation: {
    editProfile: async (
      root: any,
      { firstName, lastName, username, email, password }: any,
      { token }: any
    ) => {
      console.log(token);
      let hashedPw = null;
      if (password) {
        hashedPw = await bcrypt.hash(password, 10);
      }
      const updatedUser = await client.user.update({
        where: { id: 1 },
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
