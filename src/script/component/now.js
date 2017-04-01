import React from 'react'

class Now extends React.Component {
	constructor(props) {
      super(props);
      this.state = {}
    }
  render() {
    return (
    	<div className="now">
	       <div className="cartNone">
			  <img src="./images/orders_empty_icon.png" alt=""/>
			  <p>你还没有订单呢，赶紧下单吧</p>
			  <div className="btn" onClick={()=>{location.href='#/home';}}>去关注</div>
			</div>
		</div>
    )
  }
}

export default Now
