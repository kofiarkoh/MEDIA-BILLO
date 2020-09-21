import { AUTH_TOKEN } from "votingapis/api_const"

var localhost = 'http://192.168.8.100:4000/ticketing/dashboardbackend'
export const BASE_URL = localhost // 'http://admin.mediabillo.net/tdb/dashboardbackend'
export const getHeaders = ()=>{
    var headers = new Headers()
    headers.append('Authorization',AUTH_TOKEN)
    return headers
}