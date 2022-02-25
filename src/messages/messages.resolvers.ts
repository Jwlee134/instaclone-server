import { Resolvers } from "../types";

const resolvers: Resolvers = {
  Room: {
    users: ({ id }, args, { client }) =>
      client.user.findMany({ where: { rooms: { some: { id } } } }),
    messages: ({ id }, { lastId }, { client }) =>
      client.message.findMany({
        where: { roomId: id },
        take: 20,
        ...(lastId && { skip: 1, cursor: { id: lastId } }),
      }),
    totalUnread: ({ id }, args, { client, loggedInUser }) =>
      client.message.count({
        where: {
          roomId: id,
          read: false,
          user: { id: { not: loggedInUser?.id } },
        },
      }),
  },
  Message: {
    user: ({ id }, args, { client }) =>
      client.message.findUnique({ where: { id } }).user(),
  },
};

export default resolvers;
