require('../style/app.scss')

import React from 'react'
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
