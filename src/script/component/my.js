import React from 'react'

class My extends React.Component{
  constructor(props) {
      super(props);
      this.state = {}
  }
  // onChangeRouter(route){
  //   console.log(route);
  //   console.log(0);
  // }
  render(){
    return(
      <div className="user">
        <div className="top">
          <a href="#/login"><img src="/images/bt_unlogined.png"/></a>
          <p>买母婴，来乐友</p>
          <p>全国<span>500家门店</span>，品质保真</p>
        </div>
        <div className="yo-list yo-list-group">
          <div className="item">
            <i className="yo-ico"><img src="/images/about.png"/></i>
            <div className="flex">关于乐友</div>
            <i className="yo-ico">&#xf07f;</i>
          </div>
          <h3 className="label"></h3>
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
      </div>
    )
  }
}
export default My
