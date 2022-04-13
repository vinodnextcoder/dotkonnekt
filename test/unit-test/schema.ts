const { gql } = require('apollo-server')

const typeDefs = gql`


type Query {

getWeatherInfo(apiType:String, mapperName:String, query:String,key:String,days:Int):getApiResponse
}

type Mutation {

addApi(uri:String
name:String,
description:String,
parameter:[String],
apiType:String
): addApiResponse
apiResponseMap(region: String
name: String
country: String
lat: String
lon:String
tz_id:String
localtime:String
apiType:String
forecast:forecastType
): addApiResponse
updateApiResponseMapper(id: String, input: apiResponseMapper!): addApiResponse
}


input apiResponseMapper {
region: String
name: String
country: String
lat: String
lon:String
tz_id:String
localtime:String,
forecast:forecastType
 apiType:String
}


input forecastType {
sunrise:String
sunset:String
moonrise:String
moonset:String
moon_phase:String
moon_illumination:String
}


type Status {
code :Int 
header: String
description : String
moreInfo :String
}

type addApiResponse {
status: Status
}
type apiResponseMap {
state: String
town: String
nation: String
latitude: String
longitude:String
Time_Zone:String,
forecast:forecastTypes
apiType:String
localtime:String
}
type getApiResponse {
status: Status
data:apiResponseMap
}

type forecastTypes {
Dawn:String
Dusk:String
moonlit:String
ooosleep:String
orientation:String
Illumination:String
}



`
export = typeDefs
