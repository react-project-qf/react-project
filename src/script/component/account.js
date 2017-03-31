import React from 'react'
import MHeader from './m-header'

class Account extends React.Component{
  constructor(props) {
      super(props);
      this.state = {}
    }
    render(){
    	return(
    		<div className="account">
    			<MHeader title="账户管理"/>
    			<div className="content">
	    			<div className="yo-list yo-list-group">
	    			  <h3 className="label"></h3>
			          <div className="item">
			            <div className="flex">昵称</div>
			          </div>
			          <div className="item">
			            <div className="flex">Email</div>
			            <i className="yo-ico">&#xf07f;</i>
			          </div>
			          <div className="item">
			            <div className="flex">宝宝档案</div>
			            <div className="info phone">你有一个宝宝</div>
			            <i className="yo-ico">&#xf07f;</i>
			          </div>
			           <h3 className="label"></h3>
			          <div className="item">
			            <div className="flex">收货地址</div>
			            <i className="yo-ico">&#xf07f;</i>
			          </div>
	        		</div> 
	        	</div>
    		</div>
    	)
	}
}
export default Account