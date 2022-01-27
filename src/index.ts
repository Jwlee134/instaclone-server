import dotenv from "dotenv";
dotenv.config();

import { ApolloServer } from "apollo-server";
import schema from "./schema";

const server = new ApolloServer({ schema });

server.listen(process.env.PORT).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
