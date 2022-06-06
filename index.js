import { ApolloServer, gql } from 'apollo-server-express';
import express from 'express';
import dotenv from 'dotenv/config';

import { typeDefs } from './graphql/typeDefs.js';
import resolvers from './graphql/resolvers/index.js';
import { connectDB } from './database/connectDB.js';

const app = express();

const startServer = async () => {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req }),
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app: app });
  app.listen(4000, () => console.log('Api is runing!'));
  connectDB();
};

startServer();
