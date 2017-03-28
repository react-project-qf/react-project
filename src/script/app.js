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
import My from './component/kind1'

ReactDom.render(
	<Provider store={store}>
		<Router history={hashHistory}>
			<Route path="/" component={Index}>
				<IndexRoute path="home" component={Home}></IndexRoute>
				<Route path="home" title="首页"  component={Home}></Route>
				<Route path="kind" title="分类" component={Kind}></Route>
				<Route path="friends" title="乐妈圈" component={Friends}></Route>
				<Route path="cart" title="购物车" component={Cart}></Route>
				<Route path="my" title="我的" component={My}></Route>
			</Route>
		</Router>
	</Provider>,
	document.getElementById('root')
);