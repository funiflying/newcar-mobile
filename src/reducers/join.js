import {JOIN,JOIN_ERROR,JOIN_PENDING,JOIN_SUCCESS} from '../actions/join'

const initialState = {
    message:null,
    result:null,
    loading:false
};

export default function Specs(state=initialState,action={}){
    switch (action.type) {
        case JOIN_PENDING:
            return Object.assign({},initialState,{ loading:true});
            break;
        case JOIN_ERROR:
            return Object.assign({}, initialState, { message:action.payload.statusText,loading:false});
            break;
        case JOIN_SUCCESS:
            return Object.assign({}, initialState,{result:action.payload,loading:false});
            break;
        default:
            return state;
    }
}
