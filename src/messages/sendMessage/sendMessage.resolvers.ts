import { Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";

const resolvers: Resolvers = {
  Mutation: {
    sendMessage: protectedResolver(
      async (root, { text, roomId, userId }, { client, loggedInUser }) => {
        const user = await client.user.findUnique({
          where: { id: userId },
          select: { id: true },
        });
        if (!user) {
          return { isSuccess: false, error: "Cannot find user." };
        }
        const room = await client.room.findUnique({
          where: { id: roomId },
          select: { id: true },
        });
        await client.message.create({
          data: {
            text,
            room: {
              connectOrCreate: {
                create: {
                  users: {
                    connect: [{ id: userId }, { id: loggedInUser?.id }],
                  },
                },
                where: { id: room?.id },
              },
            },
            user: { connect: { id: loggedInUser?.id } },
          },
        });
        return { isSuccess: true };
      }
    ),
  },
};

export default resolvers;
