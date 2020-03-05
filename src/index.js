import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import dotenv from 'dotenv';
import path from 'path';

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
const BUILD_PATH = path.join(__dirname, '..', 'client', 'build');
app.use(express.static(BUILD_PATH));
app.get('*', (req, res) => {
  res.sendFile(path.join(BUILD_PATH, 'index.html'));
});
app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));
