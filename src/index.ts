import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { ApolloServer } from "apollo-server-express";
import schema from "./schema";
import { getUser } from "./users/users.utils";
import client from "./client";
import { graphqlUploadExpress } from "graphql-upload";

const startServer = async () => {
  const server = new ApolloServer({
    schema,
    context: async ({ req }) => ({
      loggedInUser: await getUser(req.headers.token),
      client,
    }),
  });
  await server.start();

  const app = express();

  app.use(graphqlUploadExpress());

  server.applyMiddleware({ app });

  await new Promise<void>((r) => app.listen({ port: process.env.PORT }, r));
  console.log(
    `🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`
  );
};

startServer();
