import { Context } from '../models/context';
import { buildErrorResponse } from '../utils/buildErrorResponse';
import { successResponse } from '../utils/successResponse';
import { checkRequiredMissingParam } from '../utils/Utils'
import { defaultError } from '../utils/defaultError'
import { serviceRouter } from '../utils/serviceRouter';
const WeatherApi = require('../models/weather');
const WeatherApiMapper = require('../models/weatherMapper')

export class WeatherController {
  static async addApi(inputObject: any, ctx: Context) {
    try {
      let requireParam = ['uri', 'name', 'apiType'];
      let missingParam = await checkRequiredMissingParam(inputObject, requireParam);
      if (missingParam) {
        return defaultError({ code: 9999, message: missingParam })
      }
      const result = await WeatherApi.create(inputObject);
      return successResponse(result, 'created');
    } catch (error) {
      console.log(error);
      return buildErrorResponse(error)
    }
  }

  static async addApiResponseMap(inputObject: any, ctx: Context) {
    try {
      let requireParam = ['region', 'name', 'country', 'lat', 'lon', 'tz_id', 'localtime'];
      let missingParam = await checkRequiredMissingParam(inputObject, requireParam);
      if (missingParam) {
        return defaultError({ code: 9999, message: missingParam })
      }
      let obj = JSON.parse(JSON.stringify(inputObject));
      const result = await WeatherApiMapper.create(obj);
      return successResponse(result, 'created');
    } catch (error) {
      return buildErrorResponse(error)
    }
  }
  static async UpdateApiResponseMapper(inputObject: any, ctx: Context) {
    try {
      const result = await WeatherApiMapper.findOneAndUpdate({ _id: inputObject.id }, inputObject.input);
      if (result) {
        return successResponse(result, 'updated');
      }
      return successResponse(result, 'notUpdated');
    } catch (error) {
      return buildErrorResponse(error)
    }
  }

  static async getWeatherInfo(inputObject: any, ctx: Context) {
    try {
      const apiInfo = await WeatherApi.findOne({ apiType: inputObject.apiType });
      if (apiInfo) {
      
        const baseUrl = `${apiInfo.uri}?${apiInfo.parameter[0]}=${inputObject.key}&${apiInfo.parameter[1]}=${inputObject.query}&`;
        let endpoint = null;
        /**
         * checking api type and creating full url
         */
        if(inputObject.apiType ==="Forecast"){
          endpoint = `${apiInfo.parameter[2]}=${inputObject.days}&${apiInfo.parameter[3]}=no&${apiInfo.parameter[4]}=no`;
        }else{ 
          endpoint = `${apiInfo.parameter[2]}=no`;
        }
        const url = `${baseUrl}${endpoint}`;
        const config = {
          method: 'get',
          url,
          headers: { 'User-Agent': 'Axios - console app' }
        }
        /**
         * Service router api call
         */
        const result = await serviceRouter(config);
        /**
         * return default error if not reachable
         */
        if((result && result.status && result.status.code === 9999) || !result){
          return buildErrorResponse(null);
        }
       /**
        * weather api response mapping database query
        */
       let reqObj ={
        apiType: inputObject.apiType
       }
       if(inputObject && inputObject.mapName ){
        reqObj['mapName'] =inputObject.mapName
       }
        const WeatherApiMapperInfo = await WeatherApiMapper.findOne(reqObj);
        if(!WeatherApiMapperInfo){
          return buildErrorResponse(null);
        }
        /**
         * response mapping
         */
        let responseObj: { [key: string]: any } = {}
        responseObj[WeatherApiMapperInfo.name]= result.location && result.location.name || null;
        responseObj[WeatherApiMapperInfo.region]= result.location && result.location.region  || null;
        responseObj[WeatherApiMapperInfo.country]= result.location && result.location.country  || null;
        responseObj[WeatherApiMapperInfo.lat]= result.location && result.location.lat  || null;
        responseObj[WeatherApiMapperInfo.lon]= result.location && result.location.lon  || null;
        responseObj[WeatherApiMapperInfo.tz_id]= result.location && result.location.tz_id  || null;
        responseObj[WeatherApiMapperInfo.localtime]=result.location && result.location.localtime  || null;
        responseObj.apiType = inputObject.apiType;
        /**
         * forecast response map
         */
        if(inputObject.apiType ==="Forecast"){
          let forecast: { [key: string]: any } = {}
          forecast[WeatherApiMapperInfo.forecast.sunrise]=  result.forecast.forecastday && result.forecast.forecastday[0].astro.sunrise || null;
          forecast[WeatherApiMapperInfo.forecast.sunset]=  result.forecast.forecastday && result.forecast.forecastday[0].astro.sunset || null;
          forecast[WeatherApiMapperInfo.forecast.moonrise]=  result.forecast.forecastday && result.forecast.forecastday[0].astro.moonrise || null;
          forecast[WeatherApiMapperInfo.forecast.moonset]=  result.forecast.forecastday && result.forecast.forecastday[0].astro.moonset || null;
          forecast[WeatherApiMapperInfo.forecast.moon_phase]=  result.forecast.forecastday && result.forecast.forecastday[0].astro.moon_phase || null;
          forecast[WeatherApiMapperInfo.forecast.moon_illumination]=  result.forecast.forecastday && result.forecast.forecastday[0].astro.moon_illumination || null;
          responseObj.forecast = forecast;
        }

        return successResponse(responseObj, 'fetch');
      }
      return successResponse({}, 'fetch');
    } catch (error) {
      return buildErrorResponse(error)
    }
  }
}
 

