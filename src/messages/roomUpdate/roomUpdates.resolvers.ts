import { withFilter } from "graphql-subscriptions";
import { NEW_MESSAGE } from "../../constants";
import pubsub from "../../pubsub";
import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Subscription: {
    roomUpdates: {
      subscribe: async (root, args, context, info) => {
        // 구독 시작 전 필터링
        const room = await context.client.room.findFirst({
          where: {
            id: args.id,
            users: { some: { id: context.loggedInUser?.id } },
          },
          select: { id: true },
        });
        if (!room) {
          throw new Error("Cannot find room.");
        }
        return withFilter(
          () => pubsub.asyncIterator(NEW_MESSAGE),
          async (payload, variables, { client, loggedInUser }) => {
            // 이벤트 수신 시 필터링
            const room = await client.room.findFirst({
              where: {
                id: args.id,
                users: { some: { id: loggedInUser?.id } },
              },
              select: { id: true },
            });
            if (!room || !loggedInUser) return false;
            return payload.roomUpdates.roomId === variables.id;
          }
        )(root, args, context, info);
      },
    },
  },
};

export default resolvers;
