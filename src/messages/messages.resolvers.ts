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
  },
};

export default resolvers;
