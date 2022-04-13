import { GraphQLResolveInfo } from 'graphql';
import { Context } from '../../models/context';
import { IResolvers } from 'graphql-tools';
import { WeatherController } from '../../controllers/weather.controller'
const GraphQLJSON = require('graphql-type-json');

const resolvers: IResolvers = {
  JSON: GraphQLJSON,
  Query: {
    getWeatherInfo:(_, inputObject, ctx: Context) => {
      return WeatherController.getWeatherInfo(inputObject, ctx);
    }
  },
  Mutation: {
    addApi: (_, inputObject, ctx: Context) => {
      return WeatherController.addApi(inputObject, ctx);
    },
    apiResponseMap: (_, inputObject, ctx: Context) => {
      return WeatherController.addApiResponseMap(inputObject, ctx);
    },
    updateApiResponseMapper: (_, inputObject, ctx: Context) => {
      return WeatherController.UpdateApiResponseMapper(inputObject, ctx);
    }
  }
};
export default resolvers;
