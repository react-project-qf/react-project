import React from 'react'

class Cart extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      cartNone:false,
      goodList:window.localStorage.getItem("ly-goodList")
    };

  }
  componentDidMount(){
    //控制显示
    if (this.state.goodList==""||this.state.goodList==null) {
      this.setState({
        cartNone:false
      })
    }else{
      this.setState({
        cartNone:true
      })
    }
  }
  render(){
    return(
      <div className="m-cat">
        <img src="./images/bg_cart.jpg" alt=""/>
        <div className="cartNone" style={{display:this.state.cartNone?"none":""}}>
           <img src="./images/shopping_empty_icon.png" alt=""/>
           <p>空空如也,快去填满它</p>
           <div className="btn" onClick={()=>{location.href='#/home';}}>随意逛逛</div>
         </div>
      </div>
    )
  }
}
export default Cart
