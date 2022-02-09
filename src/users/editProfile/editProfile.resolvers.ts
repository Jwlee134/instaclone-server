import bcrypt from "bcrypt";
import { protectedResolver } from "../users.utils";
import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Mutation: {
    editProfile: protectedResolver(
      async (
        root,
        { firstName, lastName, username, email, password, bio, avatar },
        { loggedInUser, client }
      ) => {
        console.log(avatar);
        return;
        let hashedPw = null;
        if (password) {
          hashedPw = await bcrypt.hash(password, 10);
        }
        const updatedUser = await client.user.update({
          where: { id: loggedInUser?.id },
          data: {
            firstName,
            lastName,
            username,
            email,
            bio,
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

export default resolvers;
