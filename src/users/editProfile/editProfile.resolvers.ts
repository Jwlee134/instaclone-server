import client from "../../client";
import bcrypt from "bcrypt";
import { protectedResolver } from "../users.utils";

export default {
  Mutation: {
    editProfile: protectedResolver(
      async (
        root: any,
        { firstName, lastName, username, email, password }: any,
        { loggedInUser }: any
      ) => {
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
      }
    ),
  },
};
