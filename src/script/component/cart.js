import React from 'react'
import $ from 'jquery'

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
    $.ajax({
      // offset:0,
      // rating:1,
      // reviewType:1,
      // prodid:423440,
      // productId:"S030000301",
      // ctgy_code:20,
      // brand_id:"S03",
      url:"/api/Product/single_ajax/type/skuInfo",
      type:"POST",
      dataType:"JSON",
      data:{
        sku:"S030000301"
      },
      success:function (data) {
        console.log(data);
      },
    })
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
