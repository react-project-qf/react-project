import React from 'react'
import MHeader from './m-header'

class Concerned extends React.Component{
  constructor(props) {
      super(props);
      this.state = {}
    }
    render(){
    	return(
    		<div className="concerned">
    			<MHeader title="关注的商品"/>
		         <div className="cartNone" style={{display:this.state.cartNone?"none":""}}>
		           <img src="./images/empty_guanzhu.png" alt=""/>
		           <p>你还没有关注过喜欢的商品呢</p>
		           <div className="btn" onClick={()=>{location.href='#/home';}}>随意逛逛</div>
		         </div>
    		</div>
    	)
	}
}
export default Concerned