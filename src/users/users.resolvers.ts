import { Resolvers } from "../types";

// 해당 user의 팔로워가 1억명이 넘는다면 js로 length를 체크하는 건 length가 1억개인 배열을 가져온다는 의미
// 이는 데이터베이스에 굉장히 무리가 가므로 count 메소드를 사용해서 가져옴

const resolvers: Resolvers = {
  User: {
    // 이 사람의 팔로잉 수 === 팔로워 리스트에 이 사람의 id가 존재하는 모든 유저들의 수
    totalFollowing: ({ id }, args, { client }) =>
      client.user.count({ where: { followers: { some: { id } } } }),
    // 이 사람의 팔로워 수 === 팔로잉 리스트에 이 사람의 id가 존재하는 모든 유저들의 수
    totalFollowers: ({ id }, args, { client }) =>
      client.user.count({ where: { following: { some: { id } } } }),
    isMe: ({ id }, args, { loggedInUser }) => id === loggedInUser?.id,
  },
};

export default resolvers;
