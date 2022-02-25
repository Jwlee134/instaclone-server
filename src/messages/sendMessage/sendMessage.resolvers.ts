import { NEW_MESSAGE } from "../../constants";
import pubsub from "../../pubsub";
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
        let room;
        if (roomId) {
          room = await client.room.findUnique({
            where: { id: roomId },
            select: { id: true },
          });
          if (!room) {
            return { isSuccess: false, error: "Cannot find room." };
          }
        } else {
          room = await client.room.create({
            data: {
              users: {
                connect: [{ id: userId }, { id: loggedInUser?.id }],
              },
            },
          });
        }
        const message = await client.message.create({
          data: {
            text,
            room: { connect: { id: room.id } },
            user: { connect: { id: loggedInUser?.id } },
          },
        });
        pubsub.publish(NEW_MESSAGE, { roomUpdates: message });
        return { isSuccess: true };
      }
    ),
  },
};

export default resolvers;
