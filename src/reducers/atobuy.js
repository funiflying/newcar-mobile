import {ATOBUY,ATOBUY_SUCCESS,ATOBUY_PENDING,ATOBUY_ERROR,BUY_COUNT_WECHAT,BUY_COUNT_WECHAT_PENDING,BUY_COUNT_WECHAT_SUCCESS,BUY_COUNT_WECHAT_ERROR,TOKEN_WECHAT,TOKEN_WECHAT_SUCCESS,SIGN,SIGN_SUCCESS} from '../actions/atobuy'

const initialState = {
    items: null,
    loading:false,
    message:null,
    result:{},
    sign:null
};

export default function CAR(state = initialState, action = {}) {
    switch (action.type) {
        case ATOBUY_PENDING:
            return Object.assign({}, initialState, { loading:true});
            break;
        case ATOBUY_SUCCESS:
            return Object.assign({}, initialState, { result:action.payload,loading:false});
            break;
        case ATOBUY_ERROR:
            return Object.assign({}, initialState, { message:action.payload.statusText,loading:false});
            break;
        case TOKEN_WECHAT_SUCCESS:
            return Object.assign({}, initialState);
            break;
        case SIGN_SUCCESS:
            return Object.assign({}, initialState,{ sign:action.payload});
            break;
        case BUY_COUNT_WECHAT_ERROR:
            return Object.assign({}, initialState, { items:1350});
            break;
        case BUY_COUNT_WECHAT_SUCCESS:
            return Object.assign({}, initialState, { items:action.payload.count});
            break;
        default:
            return state;
    }
}