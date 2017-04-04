import React from 'react'
import List from '../../component_dev/list/src/'
import fetchData from '../util/util.fetch.js'

class Collect extends React.Component {
	constructor(props) {
    super(props)
  
  }
  render() {
    return (
      <div className="collect">
         <div className="cartNone">
        <img src="./images/orders_empty_icon.png" alt=""/>
        <p>你还没有订单呢，赶紧下单吧</p>
        <div className="btn" onClick={()=>{location.href='#/home';}}>去关注</div>
      </div>
    </div>
    )
  }
}

export default Collect