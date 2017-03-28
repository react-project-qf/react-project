require('../style/app.scss')

import React from 'react'
<<<<<<< HEAD
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'

import Index from './component/index'
import Board from './component/board'
import Search from './component/search'
import Cart from './component/cart'
import My from './component/my'

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Index}>
      <IndexRoute component={Board}></IndexRoute>
      <Route path="board" component={Board}></Route>
      <Route path="search" component={Search}></Route>
      <Route path="cart" component={Cart}></Route>
      <Route path="my" component={My}></Route>
    </Route>
  </Router>,
  document.getElementById('root')
)
=======
import ReactDom from 'react-dom'
import {
	Router,
	Route,
	IndexRoute,
	hashHistory
} from 'react-router'

import {
	Provider
} from 'react-redux'
import {
	store
} from './redux/store'

import Index from './component/index'
import Home from './component/home'
import Kind from './component/kind'
import Friends from './component/friends'
import Cart from './component/cart'
import My from './component/my'

ReactDom.render(
	<Provider store={store}>
		<Router history={hashHistory}>
			<Route path="/" component={Index}>
				<IndexRoute path="home" component={Home}></IndexRoute>
				<Route path="home" title="0"  component={Home}></Route>
				<Route path="kind" title="1" component={Kind}></Route>
				<Route path="friends" title="2" component={Friends}></Route>
				<Route path="cart" title="3" component={Cart}></Route>
				<Route path="my" title="4" component={My}></Route>
			</Route>
		</Router>
	</Provider>,
	document.getElementById('root')
);
>>>>>>> master
