import { Resolvers } from "../types";

const resolvers: Resolvers = {
  User: {
    totalFollowing: (root) => {
      console.log(root);
      return 666;
    },
    totalFollowers: () => 333,
  },
};

export default resolvers;
