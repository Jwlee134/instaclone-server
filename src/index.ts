import { ApolloServer, gql } from "apollo-server";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

const movies = [
  {
    title: "The Awakening",
    year: 2020,
  },
  {
    title: "City of Glass",
    year: 2021,
  },
];

const typeDefs = gql`
  type Movie {
    id: Int!
    title: String!
    year: Int!
    genre: String
    createdAt: String!
    updatedAt: String!
  }
  type Query {
    movies: [Movie]
    movie(id: Int!): Movie
  }
  type Mutation {
    createMovie(title: String!, year: Int!, genre: String): Movie
    deleteMovie(id: Int!): Movie
    updateMovie(id: Int!, title: String, year: Int, genre: String): Movie
  }
`;

const resolvers = {
  Query: {
    movies: () => client.movie.findMany(),
    movie: (root: any, { id }: any) =>
      client.movie.findUnique({ where: { id } }),
  },
  Mutation: {
    createMovie: (root: any, { title, year, genre }: any) =>
      client.movie.create({ data: { title, year, genre } }),
    deleteMovie: (root: any, { id }: any) =>
      client.movie.delete({ where: { id } }),
    updateMovie: (root: any, { id, ...rest }: any) =>
      client.movie.update({ where: { id }, data: { ...rest } }),
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
