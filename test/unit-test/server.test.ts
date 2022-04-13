const dotenv = require('dotenv');
dotenv.config();

import express from 'express';
const chai = require('chai')
const { expect } = chai;
import 'graphql-import-node';
import testServer from './server'

it('Should get all users', async () => {
  const result = await testServer.executeOperation({
    query: `mutation {
      addApi(
        uri: "http://api.weatherapi.com/v1/current.json"
        description: "weather Forecast api weather"
        apiType: "Forecast"
        name: "Forecast01"
        parameter: ["key","q","days","aqi","alerts"]
      ) {
        status {
          code
          header
          description
          moreInfo
        }
      }
    }`
  });
  expect(result.data.addApi.status.code).equal(1000);
});


it('Should get status code success', async () => {
  const result = await testServer.executeOperation({
    query: `mutation {
      apiResponseMap(
        lat: "latitude"
          lon: "longitude"
          name: "town"
          region: "state"
          country: "Time"
          localtime: "localtime"
          tz_id: "Time_Zone"
          apiType: "Forecast"
        forecast: {
          sunrise: "Dawn"
          sunset: "Dusk"
          moonrise: "moon lit"
          moonset: "oon sleep"
          moon_phase: "orientation"
          moon_illumination: "Illumination"
        }
      ) {
        status {
          code
          header
          description
          moreInfo
        }
      }
    }
    `
  });
  expect(result.data.apiResponseMap.status.code).equal(1000);
});
it('Should create new record', async () => {
  const result = await testServer.executeOperation({
    query: `query {
      getWeatherInfo(
        apiType: "Forecast"
        mapperName: "c1"
        query: "London"
        key: "a30b85423ea842cf806145600221204"
        days: 1
      ) {
        status {
          code
          header
          description
        }
        data{
        apiType
          state
          nation
          town
          Time_Zone
          latitude
          longitude
          localtime
          forecast{
            Dusk
            ooosleep
            moonlit
            Illumination
            Dawn
            orientation
          }
        }
      }
    }
    `
  });
  expect(result.data.getWeatherInfo.status.code)
});
