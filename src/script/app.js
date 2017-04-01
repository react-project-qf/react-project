require('../style/app.scss')

import React from 'react'
import ReactDom from 'react-dom'
import {
	Router,
	Route,
	IndexRoute,
	IndexRedirect,
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
import CartHave from './component/carthave'
import GoPay from './component/go-pay'
import My from './component/my'
import User from './component/user'
import Login from './component/login'
import Register1 from './component/register-1'
import Register2 from './component/register-2'
import Setup from './component/setup'
import Anenst from './component/anenst'
import Share from './component/share'
import Detail from './component/detail'

import Account from './component/account'
import Concerned from './component/concerned'
import Wallet from './component/wallet'
import Adviser from './component/adviser'
import Shake from './component/shake'
import Invitation from './component/invitation'
import Circle from './component/circle'
import Payment from './component/payment'
import Now from './component/now'
import Come from './component/come'
import Collect from './component/collect'
import Evaluate from './component/evaluate'
import Page from './component/page'
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
				<Route path="user" title="5" component={User}></Route>
			</Route>
			<Route path="/login" component={Login}></Route>
			<Route path="/register-1" component={Register1}></Route>
			<Route path="/register-2" component={Register2}></Route>
			<Route path="/setup" component={Setup}></Route>
			<Route path="/anenst" component={Anenst}></Route>
			<Route path="/share" component={Share}></Route>
			<Route path="/detail" component={Detail}></Route>
			<Route path="/carthave" component={CartHave}></Route>
			<Route path="/gopay" component={GoPay}></Route>
			<Route path="/detail/:id" component={Detail}></Route>
			<Route path="/account" component={Account}></Route>
			<Route path="/concerned" component={Concerned}></Route>
			<Route path="/wallet" component={Wallet}></Route>
			<Route path="/adviser" component={Adviser}></Route>
			<Route path="/shake" component={Shake}></Route>
			<Route path="/invitation" component={Invitation}></Route>
			<Route path="/circle" component={Circle}></Route>
			<Route path="/page" component={Page}></Route>
			<Route path="/payment" component={Payment}>
				<IndexRedirect to="/Payment/now"/>
          		<Route path="now" component={Now}/>
          		<Route path="come" component={Come}/>
          		<Route path="collect" component={Collect}/>
          		<Route path="evaluate" component={Evaluate}/>
			</Route>
		</Router>
	</Provider>,
	document.getElementById('root')
);