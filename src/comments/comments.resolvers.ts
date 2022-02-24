import { Resolvers } from "../types";

const resolvers: Resolvers = {
  Comment: {
    isMine: ({ userId }, args, { loggedInUser }) => userId === loggedInUser?.id,
  },
};

export default resolvers;
