import api, {api_import} from '../api'
import API_URL from '../utils/constant'

export const JOIN="JOIN";
export const JOIN_PENDING="JOIN_PENDING";
export const JOIN_ERROR="JOIN_ERROR";
export const JOIN_SUCCESS="JOIN_SUCCESS";


export function orderSubmit(params){

    return {
        type: JOIN,
        payload: {
            promise: api.post(API_URL.JOIN,{data:params})
        }
    }
}