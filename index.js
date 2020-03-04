import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import sqlite from 'sqlite';
import dotenv from 'dotenv';

import { resolvers, typeDefs } from './schema';

dotenv.config();
const PORT = process.env.PORT || 3001;
const app = express();

sqlite.open('./db.sqlite').then(db => {
  global.db = db;
  new ApolloServer({
    typeDefs,
    resolvers,
    playground: true,
    context: ({ req }) =>
      req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress ||
      '8.8.8.8',
  }).applyMiddleware({ app });
  app.listen(PORT, () => `Listening at http://localhost:${PORT}`);
});
