import { Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";

const resolvers: Resolvers = {
  Mutation: {
    uploadPhoto: protectedResolver(
      async (root, { file, caption }, { loggedInUser, client }) => {
        let hashtagObj;
        if (caption) {
          const hashtags: string[] = caption.match(/#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/g);
          hashtagObj = hashtags.map((tag) => ({
            where: { hashtag: tag },
            create: { hashtag: tag },
          }));
        }
        const photo = await client.photo.create({
          data: {
            file,
            caption,
            owner: { connect: { id: loggedInUser?.id } },
            ...(hashtagObj && { hashtags: { connectOrCreate: hashtagObj } }),
          },
        });
        return photo;
      }
    ),
  },
};

export default resolvers;
