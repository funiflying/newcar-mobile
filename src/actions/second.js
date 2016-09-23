import api, {api_import} from '../api'
import API_URL from '../utils/constant'

export const SECOND_LIST="SECOND_LIST";
export const SECOND_LIST_PENDING="SECOND_LIST_PENDING";
export const SECOND_LIST_SUCCESS="SECOND_LIST_SUCCESS";
export const SECOND_LIST_ERROR="SECOND_LIST_ERROR";

export  function getCarList(params){
  return {
      type: SECOND_LIST,
      payload: {
          promise: api.post(API_URL.SECOND_LIST,{data:params})
      }
  }

}







