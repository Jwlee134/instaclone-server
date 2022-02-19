import { Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";
import { processHashtags } from "../photo.utils";

const resolvers: Resolvers = {
  Mutation: {
    editPhoto: protectedResolver(
      async (root, { id, caption }, { client, loggedInUser }) => {
        const photo = await client.photo.findUnique({
          where: { id },
          include: { hashtags: { select: { hashtag: true } } },
        });
        if (!photo) {
          return { isSuccess: false, error: "Cannot find photo." };
        }
        if (photo.userId !== loggedInUser?.id) {
          return {
            isSuccess: false,
            error: "You don't have permission to edit this photo.",
          };
        }
        await client.photo.update({
          where: { id },
          data: {
            caption,
            hashtags: {
              disconnect: photo.hashtags,
              connectOrCreate: processHashtags(caption),
            },
          },
        });
        return { isSuccess: true };
      }
    ),
  },
};

export default resolvers;
