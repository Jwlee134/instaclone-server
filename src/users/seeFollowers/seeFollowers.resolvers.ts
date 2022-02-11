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
      // 해당 user의 팔로워가 1억명이 넘는다면 js로 length를 체크하는 건 length가 1억개인 배열을 가져온다는 의미
      // 이는 데이터베이스에 굉장히 무리가 가므로 count 메소드를 사용해서 가져옴
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
