import { Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";
import { processHashtags } from "../photo.utils";

const resolvers: Resolvers = {
  Mutation: {
    uploadPhoto: protectedResolver(
      async (root, { file, caption }, { loggedInUser, client }) => {
        const photo = await client.photo.create({
          data: {
            file,
            caption,
            owner: { connect: { id: loggedInUser?.id } },
            hashtags: { connectOrCreate: processHashtags(caption) },
          },
        });
        return photo;
      }
    ),
  },
};

export default resolvers;
