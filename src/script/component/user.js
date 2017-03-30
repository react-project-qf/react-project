import React from 'react'

class My extends React.Component{
  constructor(props) {
      super(props);
      this.state = {
        auth:window.localStorage.getItem("ly-auth"),
        babyNumber:1
      }
      if (this.state.auth==""||this.state.auth==null) {
        location.href='#/my';
      }
  }
  render(){
    return(
      <div className="user">
        <div className="top">
          <div className="yo-header yo-header-user">
            <h2 className="title"></h2>
            <span className="regret">
              <img src="./images/set_up.png" alt=""/>
            </span>
            <span className="affirm">
              <img src="./images/toolbar_message_black.png" alt=""/>
            </span>
          </div>
          <div className="babyNumber">
            <img src="/images/head_portrait.png"/>
            <span>您有{this.state.babyNumber}个宝宝</span>
          </div>
          <p>账户管理 <i className="yo-ico">&#xf07f;</i></p>
        </div>
        <div className="yo-list yo-list-group">
          <div className="item">
            <i className="yo-ico"><img src="/images/order.png"/></i>
            <div className="flex">我的订单</div>
            <div className="info">查看全部订单</div>
            <i className="yo-ico">&#xf07f;</i>
          </div>
          <div className="order">
            <ul>
              <li>
                <i><img src="./images/pay.png" alt=""/></i>
                <b>待支付</b>
              </li>
              <li>
                <i><img src="./images/goods.png" alt=""/></i>
                <b>待收货</b>
              </li>
              <li>
                <i><img src="./images/evaluate.png" alt=""/></i>
                <b>待评价</b>
              </li>
            </ul>
          </div>
          <h3 className="label"></h3>
          <div className="item">
            <i className="yo-ico"><img src="/images/wallet.png"/></i>
            <div className="flex">我的钱包</div>
            <i className="yo-ico">&#xf07f;</i>
          </div>
          <div className="wallet">
            <ul>
              <li>
                <i>账户余额</i>
              </li>
              <li>
                <i>积分 </i><span>1000</span>
              </li>
              <li>
                <i>优惠券 </i><span>2</span>
              </li>
            </ul>
          </div>
          <h3 className="label"></h3>
          <div className="item">
            <i className="yo-ico"><img src="/images/follow.png"/></i>
            <div className="flex">关注的商品</div>
            <i className="yo-ico">&#xf07f;</i>
          </div>
          <div className="item">
            <i className="yo-ico"><img src="/images/guanzhu.png"/></i>
            <div className="flex">我的圈儿</div>
            <i className="yo-ico">&#xf07f;</i>
          </div>
          <div className="item">
            <i className="yo-ico"><img src="/images/invitation.png"/></i>
            <div className="flex">邀请闺蜜赚小钱</div>
            <i className="yo-ico">&#xf07f;</i>
          </div>
          <div className="item">
            <i className="yo-ico"><img src="/images/account_daogou.png"/></i>
            <div className="flex">乐友顾问</div>
            <i className="yo-ico">&#xf07f;</i>
          </div>
          <div className="item">
            <i className="yo-ico"><img src="/images/shake.png"/></i>
            <div className="flex">摇一摇</div>
            <i className="yo-ico">&#xf07f;</i>
          </div>
          <h3 className="label"></h3>
        </div>
      </div>
    )
  }
}
export default My
