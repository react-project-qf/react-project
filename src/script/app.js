import React from 'react'
import ReactDom from 'react-dom'
import Index from './component/index'


require('../style/app.scss')
ReactDom.render(
	<Index></Index>,
	document.getElementById('root')
);