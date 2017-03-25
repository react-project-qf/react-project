require('../style/app.scss')

import React from 'react'
import ReactDom from 'react-dom'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import Index from './component/index'
import Home from './component/home'
import Kind from './component/kind'
import Friends from './component/friends'
import Cart from './component/cart'
import My from './component/my'


ReactDom.render(
	<Router history={hashHistory}>
		<Route path="/" component={Index}>
			<IndexRoute path="home" component={Home}></IndexRoute>
			<Route path="home" component={Home}></Route>
			<Route path="kind" component={Kind}></Route>
			<Route path="friends" component={Friends}></Route>
			<Route path="cart" component={Cart}></Route>
			<Route path="my" component={My}></Route>
		</Route>
	</Router>,
	document.getElementById('root')
);
