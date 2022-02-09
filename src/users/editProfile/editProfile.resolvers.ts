import bcrypt from "bcrypt";
import { protectedResolver } from "../users.utils";
import { Resolvers } from "../../types";
import fs from "fs";

const resolvers: Resolvers = {
  Mutation: {
    editProfile: protectedResolver(
      async (
        root,
        { firstName, lastName, username, email, password, bio, avatar },
        { loggedInUser, client }
      ) => {
        let avatarUrl = null;
        if (avatar) {
          const { createReadStream, filename: orgFileName } =
            await avatar.promise;
          avatarUrl = `${Date.now()}-${orgFileName}`;
          const stream = createReadStream();
          const out = fs.createWriteStream(
            `${process.cwd()}/uploads/${avatarUrl}`
          );
          stream.pipe(out);
        }

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
            ...(avatarUrl && {
              avatar: `http://localhost:4000/uploads/${avatarUrl}`,
            }),
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
