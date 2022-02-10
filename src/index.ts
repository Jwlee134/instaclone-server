import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { ApolloServer } from "apollo-server-express";
import schema from "./schema";
import { getUser } from "./users/users.utils";
import client from "./client";
import { graphqlUploadExpress } from "graphql-upload";
import logger from "morgan";

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

  // app.use(logger("dev"));
  // process.cwd() => current working directory === /Users/jaewon/Desktop/instaclone-server
  // 브라우저 주소 표시줄에 http://localhost:4000/uploads/*에 접속하면 스태틱 파일들을 서빙한다는 의미
  app.use("/uploads", express.static(process.cwd() + "/uploads"));

  app.use(graphqlUploadExpress());

  server.applyMiddleware({ app });

  await new Promise<void>((r) => app.listen({ port: process.env.PORT }, r));
  console.log(
    `🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`
  );
};

startServer();
