import client from "../../client";
import bcrypt from "bcrypt";

export default {
  Mutation: {
    editProfile: async (
      root: any,
      { firstName, lastName, username, email, password }: any,
      { loggedInUser, protectResolver }: any
    ) => {
      protectResolver(loggedInUser);
      let hashedPw = null;
      if (password) {
        hashedPw = await bcrypt.hash(password, 10);
      }
      const updatedUser = await client.user.update({
        where: { id: loggedInUser.id },
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
