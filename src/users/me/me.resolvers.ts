import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    me: (root, args, { loggedInUser }) => loggedInUser,
  },
};

export default resolvers;
