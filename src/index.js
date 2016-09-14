import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, IndexRedirect, useRouterHistory,hashHistory} from 'react-router';
import {createHistory} from 'history'

import configureStore from './store/configureStore';

import App from './views/App';
import {getSession} from './utils';
import AtoBuy from './views/Atobuy'
import  home from  './views/Home'
import buy from './views/Buy'
import item from './views/Item'
import view from './views/Item/gallery'
import buy_new from './views/New-Buy'
import brand from './views/New-Buy/brand-index'
import series from './views/Series'
import specify from './views/Specify'
import gallery from './views/Specify/gallery'
import config from './views/Specify/conf'
import search from './views/Search'
import join from './views/Join'
const history = useRouterHistory(createHistory)({ basename: '' });
const store = configureStore();

const validate = function (next, replace, callback) {
  const isLoggedIn = !!getSession();
  if (!isLoggedIn && next.location.pathname != '/login') {
    replace('/login')
  }
  callback()
};
ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
        <Route path="/">
          <IndexRedirect to="home" />
          <Route component={App}>
            <Route path="/atobuy(/:token)" component={AtoBuy}/>
            <Route path="/home" component={home}/>
            <Route path="/buy" component={buy}/>
            <Route path="/item/:CarNo" component={item}/>
            <Route path="/view(/:CarNo/)*" component={view}/>
            <Route path="/auto" component={buy_new}/>
            <Route path="/brand" component={brand}/>
            <Route path="/series(/:SeriesNo)" component={series}/>
            <Route path="/specify(/:CarNo)" component={specify}/>
            <Route path="/gallery(/:CarNo/)*" component={gallery}/>
            <Route path="/config(/:CarNo)" component={config}/>
            <Route path="/search" component={search}/>
            <Route path="/join" component={join}/>
          </Route>
        </Route>
      </Router>
  </Provider>,
  document.getElementById('root')
);
