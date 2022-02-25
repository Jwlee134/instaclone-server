import { Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";

const resolvers: Resolvers = {
  Mutation: {
    readMessage: protectedResolver(
      async (root, { id }, { client, loggedInUser }) => {
        const message = await client.message.findFirst({
          where: {
            id,
            user: { id: { not: loggedInUser?.id } },
            room: { users: { some: { id: loggedInUser?.id } } },
          },
          select: { id: true },
        });
        if (!message) {
          return { isSucess: false, error: "Cannot find message." };
        }
        await client.message.update({
          where: { id: message.id },
          data: { read: true },
        });
        return { isSuccess: true };
      }
    ),
  },
};

export default resolvers;
