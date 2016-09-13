import api from '../api'
import API_URL from '../utils/constant'
export  const  CAR_COUNT="CAR_COUNT";
export  const CAR_COUNT_SUCCESS="CAR_COUNT_SUCCESS";
export  const CAR_COUNT_PENDING="CAR_COUNT_PENDING";
export  const CAR_COUNT_ERROR="CAR_COUNT_ERROR";

export  const  CITY_LIST="CITY_LIST";
export  const CITY_LIST_SUCCESS="CITY_LIST_SUCCESS";
export  const CITY_LIST_PENDING="CITY_LIST_PENDING";
export  const CITY_LIST_ERROR="CITY_LIST_ERROR";

export  function getCount(){
    return {
        type: 'CAR_COUNT',
        payload: {
            promise: api.post(API_URL.CAR_COUNT)
        }
    }
}
export  function getCityList(params){
    return {
        type: 'CITY_LIST',
        payload: {
            promise: api.post(API_URL.CITY_LIST,{data:params})
        }
    }
}
