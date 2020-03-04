import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import dotenv from 'dotenv';

import { resolvers, typeDefs } from './schema';

dotenv.config();
const PORT = process.env.PORT || 3001;
const app = express();

new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  context: ({ req }) => ({
    ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
  }),
}).applyMiddleware({ app });
app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));
