import api, {api_import} from '../api'
import API_URL from '../utils/constant'

export const CAR_ITEM="CAR_ITEM";
export const CAR_ITEM_PENDING="CAR_ITEM_PENDING";
export const CAR_ITEM_ERROR="CAR_ITEM_ERROR";
export const CAR_ITEM_SUCCESS="CAR_ITEM_SUCCESS";

export const CAR_ORDER="CAR_ORDER";
export const CAR_ORDER_PENDING="CAR_ORDER_PENDING";
export const CAR_ORDER_ERROR="CAR_ORDER_ERROR";
export const CAR_ORDER_SUCCESS="CAR_ORDER_SUCCESS";

export function getItem(params){
    return {
        type: CAR_ITEM,
        payload: {
            promise: api_import.post(API_URL.CAR_ITEM,{data:params})
        }
    }
}
export  function submitOrder(params){
    return {
        type: CAR_ORDER,
        payload: {
            promise: api_import.post(API_URL.CAR_ORDER_SUBMIT,{data:params})
        }
    }
}