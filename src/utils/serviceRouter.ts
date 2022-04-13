const axios = require('axios');
import { buildErrorResponse } from "./buildErrorResponse";
export async function serviceRouter(response: any) {
  try {
    let res = await axios(response);
    return res.data;
  }
  catch (error) {
    return buildErrorResponse(error)
  }
}