import { withFilter } from "graphql-subscriptions";
import { NEW_MESSAGE } from "../../constants";
import pubsub from "../../pubsub";
import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Subscription: {
    roomUpdates: {
      subscribe: async (root, args, context, info) => {
        const room = await context.client.room.findUnique({
          where: { id: args.id },
          select: { id: true },
        });
        if (!room) {
          throw new Error("Cannot find room.");
        }
        return withFilter(
          () => pubsub.asyncIterator(NEW_MESSAGE),
          (payload, variables) => payload.roomUpdates.roomId === variables.id
        )(root, args, context, info);
      },
    },
  },
};

export default resolvers;
