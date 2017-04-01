import React from 'react'
import MHeader from './m-header'

class Wallet extends React.Component{
  constructor(props) {
      super(props);
      this.state = {}
    }
    render(){
    	return(
    		<div className="wallet">
    			<MHeader title="我的钱包"/>
          <div className="content">
		         <div className="yo-list yo-list-group">
              <div className="item">
                <i className="yo-ico"><img src="/images/integral_icon.png"/></i>
                <div className="flex">积分</div>
                <i className="yo-ico">&#xf07f;</i>
              </div>
              <div className="item">
                <i className="yo-ico"><img src="/images/coupon_icon.png"/></i>
                <div className="flex">优惠券</div>
                <i className="yo-ico">&#xf07f;</i>
              </div>
              <div className="item">
                <i className="yo-ico"><img src="/images/balance_icon.png"/></i>
                <div className="flex">余额</div>
                <div className="info">0.00</div>
              </div>
            </div>
          </div>
    		</div>
    	)
	}
}
export default Wallet