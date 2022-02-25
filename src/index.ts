import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { createServer } from "http";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { ApolloServer } from "apollo-server-express";
import { execute, subscribe } from "graphql";
import schema from "./schema";
import { getUser } from "./users/users.utils";
import client from "./client";
import { graphqlUploadExpress } from "graphql-upload";

// import logger from "morgan";

// app.use(logger("dev"));
// process.cwd() => current working directory === /Users/jaewon/Desktop/instaclone-server
// 브라우저 주소 표시줄에 http://localhost:4000/uploads/*에 접속하면 스태틱 파일들을 서빙한다는 의미
// app.use("/uploads", express.static(process.cwd() + "/uploads"));

const startServer = async () => {
  const app = express();

  const httpServer = createServer(app);

  const subscriptionServer = SubscriptionServer.create(
    { schema, execute, subscribe },
    { server: httpServer, path: "/graphql" }
  );

  const server = new ApolloServer({
    schema,
    context: async ({ req }) => ({
      loggedInUser: await getUser(req.headers.token),
      client,
    }),
    plugins: [
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close();
            },
          };
        },
      },
    ],
  });
  await server.start();
  app.use(graphqlUploadExpress());
  server.applyMiddleware({ app });

  httpServer.listen(process.env.PORT, () =>
    console.log(
      `🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`
    )
  );
};

startServer();
