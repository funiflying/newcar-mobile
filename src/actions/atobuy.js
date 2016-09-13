import api from '../api'
import API_URL from '../utils/constant'
export  const  ATOBUY="ATOBUY";
export  const ATOBUY_SUCCESS="ATOBUY_SUCCESS";
export  const ATOBUY_PENDING="ATOBUY_PENDING";
export  const ATOBUY_ERROR="ATOBUY_ERROR";

export const BUY_COUNT_WECHAT="BUY_COUNT_WECHAT";
export  const BUY_COUNT_WECHAT_SUCCESS="BUY_COUNT_WECHAT_SUCCESS";
export  const BUY_COUNT_WECHAT_PENDING="BUY_COUNT_WECHAT_PENDING";
export  const BUY_COUNT_WECHAT_ERROR="BUY_COUNT_WECHAT_ERROR";

export const TOKEN_WECHAT="TOKEN_WECHAT";
export  const TOKEN_WECHAT_SUCCESS="TOKEN_WECHAT_SUCCESS";

export  const  SIGN="SING";
export  const  SIGN_SUCCESS="SIGN_SUCCESS";
export  function getCount(){
    return {
        type: 'BUY_COUNT_WECHAT',
        payload: {
            promise: api.post(API_URL.BUY_COUNT_WECHAT,{data:{WeChatPureg:1}})
        }
    }
}
export  function setToken(params){
    return {
        type: 'TOKEN_WECHAT',
        payload: {
            promise: api.post(API_URL.TOKEN_WECHAT,{data:params})
        }
    }
}
export  function getSign(){
    return {
        type: 'SIGN',
        payload: {
            promise: api.post(API_URL.SIGN)
        }
    }
}
export function submitAtoBuy(params){
    return {
        type: 'ATOBUY',
        payload: {
            promise: api.post(API_URL.ATOBUY,{data:params})
        }
    }
}