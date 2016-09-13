import  {CAR_ITEM,CAR_ITEM_ERROR,CAR_ITEM_PENDING,CAR_ITEM_SUCCESS,CAR_ORDER,CAR_ORDER_ERROR,CAR_ORDER_PENDING,CAR_ORDER_SUCCESS} from '../actions/item'

const initialState = {
    item: null,
    message:null,
    result:null,
    loading:false
};

export default function Buy(state = initialState, action = {}) {
    switch (action.type) {
        case CAR_ITEM_PENDING:
            return Object.assign({}, initialState, { loading:true});
            break;
        case CAR_ITEM_ERROR:
            return Object.assign({}, initialState, { message:action.payload.statusText,loading:false});
            break;
        case CAR_ITEM_SUCCESS:
            return Object.assign({}, initialState,{item:action.payload,loading:false});
            break;
        case CAR_ORDER_PENDING:
            return Object.assign({}, initialState, { loading:true});
            break;
        case CAR_ORDER_ERROR:
            return Object.assign({}, initialState, { message:action.payload.statusText,loading:false});
            break;
        case CAR_ORDER_SUCCESS:
            return Object.assign({}, initialState,{result:action.payload,loading:false});
            break;
        default:
            return state;
    }
}