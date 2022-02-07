import dotenv from "dotenv";
dotenv.config();

import { ApolloServer } from "apollo-server";
import schema from "./schema";

const server = new ApolloServer({
  schema,
  context: {
    token:
      "eyJhbGciOiJIUzI1NiJ9.MQ.tChKv0LVM0hqyyH_t2MgExEqb4TTEH8XAhZDgY4fVzQ",
  },
});

server.listen(process.env.PORT).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
