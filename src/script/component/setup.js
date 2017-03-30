import React from 'react'
import MHeader from './m-header'

class Setup extends React.Component{
  constructor(props) {
      super(props);
      this.state = {}
    }
    clear(){
    	 window.localStorage.setItem("ly-auth","");
    }
    render(){
    	return(
    		<div className="setup">
    			 <MHeader title="设置"/>
    			 <div className="content">
    			 <h2 className="gap"></h2>
    			 	<div className="yo-list yo-list-group">
				        <div className="item">
				            <a href="#/anenst"><i className="yo-ico"><img src="/images/about.png"/></i></a>
				            <a href="#/anenst" className="lian"><div className="flex">关于乐友</div></a>
				            <a href="#/anenst" className="bol"><i className="yo-ico">&#xf07f;</i></a>
				          
				        </div>
				        
			          <h3 className="label"></h3>
			          <div className="item">
			            <i className="yo-ico"><img src="/images/setting.png"/></i>
			            <div className="flex">意见反馈</div>
			            <i className="yo-ico">&#xf07f;</i>
			          </div>
			          <div className="item">
			            <i className="yo-ico"><img src="/images/call.png"/></i>
			            <div className="flex">客服电话(9:00-18:00)</div>
			            <div className="info phone">400-666-9888</div>
			            <i className="yo-ico">&#xf07f;</i>
			          </div>
			          <div className="item">
			            <i className="yo-ico"><img src="/images/ic_version.png"/></i>
			            <div className="flex">当前版本</div>
			            <div className="info">3.1.2(113)</div>
			          </div>
			        </div>
			        <div className="exit">
			        	<a href="#/my"><botton className="btn" onClick={this.clear}>退出登录</botton></a>
			        </div>
    			 </div>
    		</div>
    	)
	}
}
export default Setup