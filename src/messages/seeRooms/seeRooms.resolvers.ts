import { Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";

const resolvers: Resolvers = {
  Query: {
    seeRooms: protectedResolver((root, { lastId }, { client, loggedInUser }) =>
      client.room.findMany({
        where: { users: { some: { id: loggedInUser?.id } } },
        take: 5,
        ...(lastId && { skip: 1, cursor: { id: lastId } }),
      })
    ),
  },
};

export default resolvers;
