import { deletePhotoFromS3 } from "../../shared/shared.utils";
import { Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";

const resolvers: Resolvers = {
  Mutation: {
    deletePhoto: protectedResolver(
      async (root, { id }, { client, loggedInUser }) => {
        const photo = await client.photo.findUnique({
          where: { id },
          select: { userId: true },
        });
        if (!photo) {
          return { isSuccess: false, error: "Cannot find photo." };
        }
        if (photo.userId !== loggedInUser?.id) {
          return { isSuccess: false, error: "You are not the owner." };
        }
        const { file } = await client.photo.delete({
          where: { id },
          select: { file: true },
        });
        await deletePhotoFromS3(file);
        return { isSuccess: true };
      }
    ),
  },
};

export default resolvers;
