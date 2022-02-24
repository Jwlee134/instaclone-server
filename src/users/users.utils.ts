import jwt from "jsonwebtoken";
import client from "../client";
import { Resolver } from "../types";

export const getUser = async (token?: string | string[]) => {
  if (!token) return null;
  try {
    const id = jwt.verify(token as string, process.env.PRIVATE_KEY!);
    const user = await client.user.findUnique({
      where: { id: parseInt(id as string, 10) },
    });
    if (user) return user;
    return null;
  } catch {
    return null;
  }
};

export const protectedResolver =
  (resolver: Resolver) => (root: any, args: any, context: any, info: any) => {
    if (info.operation.operation === "query") return null;
    if (!context.loggedInUser) {
      return { isSuccess: false, error: "You need to login." };
    }
    return resolver(root, args, context, info);
  };
