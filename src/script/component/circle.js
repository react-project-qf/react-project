import React from 'react'
import MHeader from './m-header'

class Circle extends React.Component{
  constructor(props) {
      super(props);
      this.state = {
        zh:""
      }
    }
  
    render(){
    	return(
    		<div className="circle">
    			<MHeader title={this.state.zh}/>
		         <div className="edit">
                <ul>
                  <li className="xin_bg"><img src="/images/bg_login_head.png"/></li>
                  <li className="xin_tou"><img src="/images/noavatar.png"/></li>
                </ul>
             </div>
             <div className="xin_fa">
              <ul>
                <li>
                <span className="fa_tu">发表的图片</span>
                <span className="fa_hua">关注的话题</span>
                </li>
              </ul>
            </div>
            <div className="cartNone" style={{display:this.state.cartNone?"none":""}}>
               <img src="./images/empty_guanzhu.png" alt=""/>
               <p>江湖里怎么能没有我的传说！</p>
               <div className="btn" onClick={()=>{location.href='#/home';}}>马上发一个</div>
             </div>
    		</div>
    	)
	   }

     componentWillMount() {
       var a=window.localStorage.getItem("ly-phone");
         this.setState({
            zh:a
          })
      }
}
export default Circle