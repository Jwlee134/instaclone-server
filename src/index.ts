import dotenv from "dotenv";
dotenv.config();

import { ApolloServer } from "apollo-server";
import schema from "./schema";
import { getUser } from "./users/users.utils";
import client from "./client";

const server = new ApolloServer({
  schema,
  context: async ({ req }) => ({
    loggedInUser: await getUser(req.headers.token),
    client,
  }),
});

server.listen(process.env.PORT).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
