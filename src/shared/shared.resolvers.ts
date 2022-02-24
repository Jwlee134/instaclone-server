import { GraphQLUpload } from "graphql-upload";
import { Resolvers } from "../types";

const resolvers: Resolvers = {
  Upload: GraphQLUpload as any,
};

export default resolvers;
