import React from 'react'
import MHeader from './m-header'

class Adviser extends React.Component{
  constructor(props) {
      super(props);
      this.state = {}
    }
    render(){
    	return(
    		<div className="concerned">
    			<MHeader title="乐友顾问"/>
		         <div className="cartNone" style={{display:this.state.cartNone?"none":""}}>
		           <img src="./images/empty_guanzhu.png" alt=""/>
		           <p>你还没有关注的顾问哦~快去关注一个吧！</p>
		           <div className="btn" onClick={()=>{location.href='#/home';}}>去关注</div>
		         </div>
    		</div>
    	)
	}
}
export default Adviser