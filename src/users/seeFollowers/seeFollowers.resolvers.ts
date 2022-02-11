import { Resolvers } from "../../types";

// Offset Pagination 사용

const resolvers: Resolvers = {
  Query: {
    seeFollowers: async (root, { username, page }, { client }) => {
      // 단순히 유저가 있는지만 확인하는 건데 유저의 모든 필드를 가져오면 비효율적이기 때문에 id만 가져옴
      const targetUser = await client.user.findUnique({
        where: { username },
        select: { id: true },
      });
      if (!targetUser) {
        return { isSuccess: false, error: "Cannot find user." };
      }
      const followers = await client.user
        .findUnique({ where: { username } })
        .followers({ skip: (page - 1) * 5, take: 5 });
      // 이 사람의 팔로워 수 === 팔로잉 리스트에 이 사람의 id가 존재하는 모든 유저들의 수
      const totalFollowers = await client.user.count({
        where: { following: { some: { username } } },
      });
      return {
        isSuccess: true,
        followers,
        totalFollowers,
        totalPages: Math.ceil(totalFollowers / 5),
      };
    },
  },
};

export default resolvers;
