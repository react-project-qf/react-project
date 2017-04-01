import React from 'react'
import MHeader from './m-header'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import Now from './now'
import Come from './come'
import Collect from './collect'
import Evaluate from './evaluate'

class Payment extends React.Component{
  constructor(props) {
      super(props);
      this.state = {}
    }
    render(){
    	return(
    		<div className="payment">
    			<MHeader title="我的订单"/>
          <div>
              <ul>
                <li className="active">
                  <Link to="/payment/now" activeClassName="active">           
                    <b>全部</b>
                  </Link>
                </li>
                <li>
                  <Link to="/payment/come" activeClassName="active">
                    <b>待支付</b>
                  </Link>
                </li>
                <li>
                  <Link to="/payment/collect" activeClassName="active">
                    <b>待收货</b>
                  </Link>
                </li>
                <li>
                  <Link to="/payment/evaluate" activeClassName="active">
                    <b>待评价</b>
                  </Link>
                </li>
              </ul>
          </div>
          <div>
             {this.props.children}
          </div>
    		</div>
    	)
	}
}
export default Payment