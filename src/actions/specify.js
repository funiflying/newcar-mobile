import api, {api_import} from '../api'
import API_URL from '../utils/constant';

export const CAR_SPECS_ITEM_NEW="CAR_SPECS_ITEM_NEW";
export const CAR_SPECS_ITEM_NEW_PENDING="CAR_SPECS_ITEM_NEW_PENDING";
export const CAR_SPECS_ITEM_NEW_ERROR="CAR_SPECS_ITEM_NEW_ERROR";
export const CAR_SPECS_ITEM_NEW_SUCCESS="CAR_SPECS_ITEM_NEW_SUCCESS";

export const CAR_SPECS_ITEM_PIC_NEW="CAR_SPECS_ITEM_PIC_NEW";
export const CAR_SPECS_ITEM_PIC_NEW_PENDING="CAR_SPECS_ITEM_PIC_NEW_PENDING";
export const CAR_SPECS_ITEM_PIC_NEW_ERROR="CAR_SPECS_ITEM_PIC_NEW_ERROR";
export const CAR_SPECS_ITEM_PIC_NEW_SUCCESS="CAR_SPECS_ITEM_PIC_NEW_SUCCESS";

export const CAR_SPECS_ITEM_CONF_NEW="CAR_SPECS_ITEM_CONF_NEW";
export const CAR_SPECS_ITEM_CONF_NEW_PENDING="CAR_SPECS_ITEM_CONF_NEW_PENDING";
export const CAR_SPECS_ITEM_CONF_NEW_ERROR="CAR_SPECS_ITEM_CONF_NEW_ERROR";
export const CAR_SPECS_ITEM_CONF_NEW_SUCCESS="CAR_SPECS_ITEM_CONF_NEW_SUCCESS";

export const CAR_SPECS_ITEM_VIDEO_NEW="CAR_SPECS_ITEM_VIDEO_NEW";
export const CAR_SPECS_ITEM_VIDEO_NEW_PENDING="CAR_SPECS_ITEM_VIDEO_NEW_PENDING";
export const CAR_SPECS_ITEM_VIDEO_NEW_ERROR="CAR_SPECS_ITEM_VIDEO_NEW_ERROR";
export const CAR_SPECS_ITEM_VIDEO_NEW_SUCCESS="CAR_SPECS_ITEM_VIDEO_NEW_SUCCESS";

export const CAR_SUBMIT_NEW="CAR_SUBMIT_NEW";
export const CAR_SUBMIT_NEW_PENDING="CAR_SUBMIT_NEW_PENDING";
export const CAR_SUBMIT_NEW_ERROR="CAR_SUBMIT_NEW_ERROR";
export const CAR_SUBMIT_NEW_SUCCESS="CAR_SUBMIT_NEW_SUCCESS";
export function getSpecify(params){
    return {
        type: CAR_SPECS_ITEM_NEW,
        payload: {
            promise: api_import.post(API_URL.CAR_SPECS_ITEM_NEW,{data:params})
        }
    }
}

export function getSpecPic(params){
    return {
        type: CAR_SPECS_ITEM_PIC_NEW,
        payload: {
            promise: api_import.post(API_URL.CAR_SPECS_ITEM_PIC_NEW,{data:params})
        }
    }
}


export function getSpecConf(params){
    return {
        type: CAR_SPECS_ITEM_CONF_NEW,
        payload: {
            promise: api_import.post(API_URL.CAR_SPECS_ITEM_CONF_NEW,{data:params})
        }
    }
}

export function getSpecVideo(params){
    return {
        type: CAR_SPECS_ITEM_VIDEO_NEW,
        payload: {
            promise: api_import.post(API_URL.CAR_SPECS_ITEM_VIDEO_NEW,{data:params})
        }
    }
}
export function submitOrder(params){
    return {
        type: CAR_SUBMIT_NEW,
        payload: {
            promise: api_import.get(API_URL.CAR_SUBMIT_NEW,{params:params})
        }
    }
}