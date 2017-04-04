import React from 'react'
import $ from 'jquery'
import Dialog from '../../component_dev/dialog/src'

class Cart extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      goodList:window.localStorage.getItem("ly-goodList"),
      auth:window.localStorage.getItem("ly-auth"),
      dialogShow:false,
      dialogContent:"温馨提示"
    };
  }
  componentDidMount(){
    //判断登录状态
    if (this.state.auth==""||this.state.auth==null) {
      this.setState({
        dialogShow:true,
        dialogContent:"您还没登录，请先登录"
      })
    }
    //控制显示
    if (this.state.goodList==""||this.state.goodList==null) {
    }else{
      location.href='#/carthave';
    }
  }
  dialogOk(){
    this.setState({
      dialogShow:false
    })
    window.location.href="#/login"
  }
  dialogCancel(){
    this.setState({
      dialogShow:false
    })
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
        <Dialog  title="提示" show={this.state.dialogShow} onOk={() => this.dialogOk()} onCancel={() => this.dialogCancel()}>
            <p>{this.state.dialogContent}</p>
        </Dialog>
      </div>
    )
  }
}
export default Cart
