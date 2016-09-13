import {CAR_SPECS_LIST_NEW,CAR_SPECS_LIST_NEW_ERROR,CAR_SPECS_LIST_NEW_PENDING,CAR_SPECS_LIST_NEW_SUCCESS,CAR_RECOMMEND_NEW,CAR_RECOMMEND_NEW_ERROR,CAR_RECOMMEND_NEW_PENDING,CAR_RECOMMEND_NEW_SUCCESS,
    CAR_SERIES_DETAIL_NEW,CAR_SERIES_DETAIL_NEW_ERROR,CAR_SERIES_DETAIL_NEW_PENDING,CAR_SERIES_DETAIL_NEW_SUCCESS

} from '../actions/series'

const initialState = {
    items: null,
    message:null,
    result:null,
    loading:false,
    recommend:null,
    detail:null
};
export default function Specs(state=initialState,action={}){
    switch (action.type) {
        case CAR_SPECS_LIST_NEW_PENDING:
            return Object.assign({},initialState,{ loading:true});
            break;
        case CAR_SPECS_LIST_NEW_ERROR:
            return Object.assign({}, initialState, { message:action.payload.statusText,loading:false});
            break;
        case CAR_SPECS_LIST_NEW_SUCCESS:
            return Object.assign({}, initialState,{items:action.payload.data,loading:false});
            break;
        case CAR_RECOMMEND_NEW_ERROR:
            return Object.assign({}, initialState, { recommend:{message:action.payload.statusText},loading:false});
            break;
        case CAR_RECOMMEND_NEW_SUCCESS:
            if(action.payload.status==0||action.payload.count==0){
                return Object.assign({}, initialState,{recommend:null,loading:false});
            }
            return Object.assign({}, initialState,{recommend:action.payload.data,loading:false});
            break;
        case CAR_SERIES_DETAIL_NEW_PENDING:
            return Object.assign({},initialState,{ loading:true});
            break;
        case CAR_SERIES_DETAIL_NEW_ERROR:
            return Object.assign({}, initialState, { message:action.payload.statusText,loading:false});
            break;
        case CAR_SERIES_DETAIL_NEW_SUCCESS:
            return Object.assign({}, initialState,{detail:action.payload.data,loading:false});
            break;
        default:
            return state;
    }
}
