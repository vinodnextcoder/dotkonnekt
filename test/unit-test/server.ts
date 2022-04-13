const dotenv = require('dotenv');
dotenv.config();

import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import 'graphql-import-node';
import typeDefs from './schema';
import { makeExecutableSchema } from '@graphql-tools/schema'
import { MongoHelper } from '../../src/helpers/mongoHelpers';
import resolvers from '../../src/graphql/resolvers/resolvers';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});


const app = express();
const mHelper = new MongoHelper();
mHelper.initiateMongoConnection();

const testServer = new ApolloServer({
  schema
});

export = testServer;
