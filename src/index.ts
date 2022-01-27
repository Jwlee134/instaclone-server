import { ApolloServer, gql } from "apollo-server";

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
    id: Int
    title: String
    year: Int
  }
  type Query {
    movies: [Movie]
    movie(title: String!): Movie
  }
  type Mutation {
    createMovie(title: String!): Boolean
    deleteMovie(title: String!): Boolean
  }
`;

const resolvers = {
  Query: {
    movies: () => movies,
    movie: (root: any, { title }: any) => {
      return movies[movies.findIndex((movie) => movie.title === title)];
    },
  },
  Mutation: {
    createMovie: (root: any, { title }: any) => {
      movies.push({ title, year: 2022 });
      return true;
    },
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
