import { Resolvers } from "../types";

const resolvers: Resolvers = {
  Photo: {
    owner: ({ userId }, args, { client }) =>
      client.user.findUnique({ where: { id: userId } }),
    hashtags: ({ id }, args, { client }) =>
      client.hashtag.findMany({ where: { photos: { some: { id } } } }),
    likes: ({ id }, args, { client }) =>
      client.like.count({ where: { photoId: id } }),
  },
  Hashtag: {
    totalPhotos: ({ id }, args, { client }) =>
      client.photo.count({ where: { hashtags: { some: { id } } } }),
    photos: ({ id }, { lastId }, { client }) =>
      client.hashtag.findUnique({ where: { id } }).photos({
        take: 5,
        ...(lastId && { skip: 1, cursor: { id: lastId } }),
      }),
  },
};

export default resolvers;
