import  {CAR_LIST,CAR_LIST_ERROR,CAR_LIST_PENDING,CAR_LIST_SUCCESS} from '../actions/buy'

const initialState = {
    items: null,
    message:null,
    result:null,
    loading:false
};

export default function Buy(state = initialState, action = {}) {
    switch (action.type) {
        case CAR_LIST_PENDING:
            return Object.assign({}, initialState, { loading:true});
            break;
        case CAR_LIST_ERROR:
            return Object.assign({}, initialState, { message:action.payload.statusText,loading:false});
            break;
        case CAR_LIST_SUCCESS:
            return Object.assign({}, initialState,{items:action.payload,loading:false});
            break;
        default:
            return state;
    }
}