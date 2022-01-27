import client from "../client";

export default {
  Mutation: {
    createMovie: (root: any, { title, year, genre }: any) =>
      client.movie.create({ data: { title, year, genre } }),
    deleteMovie: (root: any, { id }: any) =>
      client.movie.delete({ where: { id } }),
    updateMovie: (root: any, { id, ...rest }: any) =>
      client.movie.update({ where: { id }, data: { ...rest } }),
  },
};
