import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    seeFollowing: async (root, { username, lastId }, { client }) => {
      // 단순히 유저가 있는지만 확인하는 건데 유저의 모든 필드를 가져오면 비효율적이기 때문에 id만 가져옴
      const targetUser = await client.user.findUnique({
        where: { username },
        select: { id: true },
      });
      if (!targetUser) {
        return { isSuccess: false, error: "Cannot find user." };
      }
      const following = await client.user
        .findUnique({ where: { username } })
        .following({
          take: 5,
          ...(lastId && { skip: 1, cursor: { id: lastId } }),
        });
      return { isSuccess: true, following };
    },
  },
};

export default resolvers;
