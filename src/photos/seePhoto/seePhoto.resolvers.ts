import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    seePhoto: (root, { id }, { client }) =>
      client.photo.findUnique({ where: { id } }),
  },
};

export default resolvers;
