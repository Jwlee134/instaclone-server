import { PrismaClient, User } from "@prisma/client";

type Context = {
  loggedInUser?: User;
  client: PrismaClient;
};

type Subscription = {
  subscribe: (
    root: any,
    args: any,
    context: Context,
    info: any
  ) => Promise<AsyncIterator<any, any, undefined>>;
};

type Resolver = (root: any, args: any, context: Context, info: any) => any;

export type Resolvers = {
  [key: string]: {
    [key: string]: Resolver | Subscription;
  };
};
