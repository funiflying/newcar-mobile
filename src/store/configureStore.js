import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk';

import promiseMiddleware from '../middlewares/promiseMiddleware'

import  atobuy from '../reducers/atobuy'
import  home from '../reducers/home'
import  buy from '../reducers/buy'
import  item from '../reducers/item'
import buy_new from '../reducers/buy-new'
import series from '../reducers/series'
import specify from '../reducers/specify'
import join from '../reducers/join'
import second from '../reducers/second'
const reducer = combineReducers({atobuy,home,buy,item,buy_new,series,specify,join,second});
const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  promiseMiddleware({promiseTypeSuffixes: ['PENDING', 'SUCCESS', 'ERROR']})
)(createStore);
export default function configureStore(initialState) {
  return createStoreWithMiddleware(reducer, initialState);
}
