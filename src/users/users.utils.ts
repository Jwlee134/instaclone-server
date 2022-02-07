import jwt from "jsonwebtoken";
import client from "../client";

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
