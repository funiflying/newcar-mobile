import {CAR_COUNT,CAR_COUNT_ERROR,CAR_COUNT_SUCCESS,CITY_LIST,CITY_LIST_ERROR, CITY_LIST_SUCCESS} from '../actions/home'

const initialState = {
    items: null,
    message:null,
    result:null
};
export default function Home(state = initialState, action = {}) {
    switch (action.type) {
        case CAR_COUNT_SUCCESS:
            return Object.assign({}, initialState, { result:action.payload});
            break;
        case CAR_COUNT_ERROR:
            return Object.assign({}, initialState, { message:action.payload.statusText,loading:false});
            break;
        case CITY_LIST_SUCCESS:
            return Object.assign({}, initialState,{items:action.payload});
            break;
        case CITY_LIST_ERROR:
            return Object.assign({}, initialState);
            break;
        default:
            return state;
    }
}