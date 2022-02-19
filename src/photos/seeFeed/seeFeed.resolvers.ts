import { Resolvers } from "../../types";
import { protectedResolver } from "../../users/users.utils";

const resolvers: Resolvers = {
  Query: {
    seeFeed: protectedResolver((root, { lastId }, { client, loggedInUser }) =>
      client.photo.findMany({
        where: {
          OR: [
            { owner: { followers: { some: { id: loggedInUser?.id } } } },
            { userId: loggedInUser?.id },
          ],
        },
        take: 5,
        ...(lastId && { skip: 1, cursor: { id: lastId } }),
        orderBy: { createdAt: "desc" },
      })
    ),
  },
};

export default resolvers;
