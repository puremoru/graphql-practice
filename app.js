const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const { users } = require('./users');
const { posts } = require('./posts');

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
    type User {
        id: Int
        name: String
        age: Int
        created_date: String
    }
    type Post {
        id: Int
        title: String
        content: String
    }
    type Query {
        users: [User]
        posts: [Post]
    }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    users: () => users,
    posts: () => posts
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);