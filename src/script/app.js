require('../style/app.scss')

import React from 'react'
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
import Login from './component/login'
import Register1 from './component/register-1'
import Register2 from './component/register-2'
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
			<Route path="/login" component={Login}></Route>
			<Route path="/register-1" component={Register1}></Route>
			<Route path="/register-2" component={Register2}></Route>
		</Router>
	</Provider>,
	document.getElementById('root')
);