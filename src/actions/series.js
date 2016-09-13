import api, {api_import} from '../api'
import API_URL from '../utils/constant';

export const CAR_SPECS_LIST_NEW="CAR_SPECS_LIST_NEW";
export const CAR_SPECS_LIST_NEW_PENDING="CAR_SPECS_LIST_NEW_PENDING";
export const CAR_SPECS_LIST_NEW_ERROR="CAR_SPECS_LIST_NEW_ERROR";
export const CAR_SPECS_LIST_NEW_SUCCESS="CAR_SPECS_LIST_NEW_SUCCESS";

export const CAR_RECOMMEND_NEW="CAR_RECOMMEND_NEW";
export const CAR_RECOMMEND_NEW_PENDING="CAR_RECOMMEND_NEW_PENDING";
export const CAR_RECOMMEND_NEW_ERROR="CAR_RECOMMEND_NEW_ERROR";
export const CAR_RECOMMEND_NEW_SUCCESS="CAR_RECOMMEND_NEW_SUCCESS";

export const CAR_SERIES_DETAIL_NEW="CAR_SERIES_DETAIL_NEW";
export const CAR_SERIES_DETAIL_NEW_PENDING="CAR_SERIES_DETAIL_NEW_PENDING";
export const CAR_SERIES_DETAIL_NEW_ERROR="CAR_SERIES_DETAIL_NEW_ERROR";
export const CAR_SERIES_DETAIL_NEW_SUCCESS="CAR_SERIES_DETAIL_NEW_SUCCESS";
export  function getSpecsList(params){
    return {
        type: CAR_SPECS_LIST_NEW,
        payload: {
            promise: api_import.post(API_URL.CAR_SPECS_LIST_NEW,{data:params})
        }
    }
}
export function  getRecommendList(params){
    return {
        type: CAR_RECOMMEND_NEW,
        payload: {
            promise: api_import.post(API_URL.CAR_RECOMMEND_NEW,{data:params})
        }
    }
}
export function  getSeriesDetail(params){
    return {
        type: CAR_SERIES_DETAIL_NEW,
        payload: {
            promise: api_import.post(API_URL.CAR_SERIES_DETAIL_NEW,{data:params})
        }
    }
}

