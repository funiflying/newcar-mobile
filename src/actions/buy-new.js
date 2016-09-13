import api, {api_import} from '../api'
import API_URL from '../utils/constant'

export const CAR_LIST="CAR_LIST";
export const CAR_LIST_PENDING="CAR_LIST_PENDING";
export const CAR_LIST_ERROR="CAR_LIST_ERROR";
export const CAR_LIST_SUCCESS="CAR_LIST_SUCCESS";


export function getCarList(params){

    return {
        type: CAR_LIST,
        payload: {
            promise: api_import.post(API_URL.CAR_LIST_NEW,{data:params})
        }
    }
}
