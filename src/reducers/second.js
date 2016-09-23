import {SECOND_LIST,SECOND_LIST_ERROR,SECOND_LIST_PENDING,SECOND_LIST_SUCCESS} from '../actions/second'

const initialState = {
    items: null,
    message:null,
    result:null,
    loading:false
};

export default function Second(state = initialState, action = {}) {
    switch (action.type) {
        case SECOND_LIST_PENDING:
            return Object.assign({}, initialState, { loading:true});
            break;
        case SECOND_LIST_ERROR:
            return Object.assign({}, initialState, { message:action.payload.statusText,loading:false});
            break;
        case SECOND_LIST_SUCCESS:
            return Object.assign({}, initialState,{items:action.payload,loading:false});
            break;
        default:
            return state;
    }
}

