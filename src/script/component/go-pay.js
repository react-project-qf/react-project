import React from 'react'
import Header from './m-header'
import Dialog from '../../component_dev/dialog/src'

class GoPay extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      dialogShow:false,
      dialogContent:"正在开发中。。。"
    };
  }
  componentWillMount(){
  }
  show(){
    this.setState({
      dialogShow:true
    })
  }
  dialogOk(){
    this.setState({
      dialogShow:false
    })
  }
  render(){
    return(
      <div className="m-cart">
        <Header title="提交订单"></Header>
        <div className="bottom">
          <span>应付金额</span>
          <div className="heji">
            <p>合计：<span>￥</span></p>
          </div>
          <div className="js" onClick={this.show.bind(this)}>
            立即下单
          </div>
        </div>
        <Dialog  title="提示" show={this.state.dialogShow} onOk={() => this.dialogOk()} onCancel={() => this.dialogOk()}>
            <p>{this.state.dialogContent}</p>
        </Dialog>
      </div>
    )
  }
}
export default GoPay
