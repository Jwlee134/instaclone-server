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
    movie(title: String!): Movie
  }
  type Mutation {
    createMovie(title: String!, year: Int!, genre: String): Movie
    deleteMovie(title: String!): Boolean
  }
`;

const resolvers = {
  Query: {
    movies: () => client.movie.findMany(),
    movie: (root: any, { title }: any) => {
      return movies[movies.findIndex((movie) => movie.title === title)];
    },
  },
  Mutation: {
    createMovie: (root: any, { title, year, genre }: any) =>
      client.movie.create({ data: { title, year, genre } }),
    deleteMovie: (root: any, { title }: any) => {
      movies.splice(
        movies.findIndex((movie) => movie.title === title),
        1
      );
      return true;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
