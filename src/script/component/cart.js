import React from 'react'
import $ from 'jquery'

class Cart extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      goodList:window.localStorage.getItem("ly-goodList")
    };
  }
  componentDidMount(){
    //控制显示
    if (this.state.goodList==""||this.state.goodList==null) {
    }else{
      location.href='#/carthave';
    }
  }
  render(){
    return(
      <div className="m-cart">
        <img className="topimg" src="./images/bg_cart.jpg" alt=""/>
        <div className="cartNone">
          <img src="./images/shopping_empty_icon.png" alt=""/>
          <p>空空如也,快去填满它</p>
          <div className="btn" onClick={()=>{location.href='#/home';}}>随意逛逛</div>
        </div>
      </div>
    )
  }
}
export default Cart
