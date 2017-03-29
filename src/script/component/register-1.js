import React from 'react'
import MHeader from './m-header'
import { browserHistory,Link } from 'react-router'
import Dialog from '../../component_dev/dialog/src'

class Register extends React.Component{
  constructor(props) {
      super(props);
      this.state = {
        phone:"",
        verCode:"",
        dialogShow:false,
        dialogContent:"温馨提示"
      }
  }
  back(){
    browserHistory.go(-1)
  }
  bindPhone(e){
    this.setState({
     phone: e.target.value
   })
  }
  bindverCode(e){
    this.setState({
     verCode: e.target.value
   })
  }
  submit(){
    let phone=this.state.phone;
    if(phone==""){
      this.setState({
        dialogShow:true,
        dialogContent:"亲，忘填手机号啦"
      })
      return
    } else if(!(/^1[34578]\d{9}$/.test(phone))){
      this.setState({
        dialogShow:true,
        dialogContent:"手机号格式有误"
      })
      return
    }else{
      window.localStorage.setItem("ly-phone",phone);
      location.href='#/register-2';
    }
  }
  dialogOk(){
    this.setState({
      dialogShow:false
    })
  }
  render(){
    return(
      <div className="register">
        <MHeader title="注册"/>
        <div className="content">
          <div className="yo-list yo-list-group">
            <h3 className="label"></h3>
            <div className="item">
              <i className="yo-ico">手机号</i>
              <div className="flex"><input type="text" value={this.state.phone} onChange={this.bindPhone.bind(this)} placeholder="用户名/手机号"/></div>
              <i className="yo-ico ico" >&#xf063;</i>
            </div>
            <div className="item">
              <i className="yo-ico">验证码</i>
              <div className="flex"><input type="password" value={this.state.verCode} onChange={this.bindverCode.bind(this)} placeholder="6-10位密码"/></div>
              <div className="info">发送验证码</div>
              <i className="yo-ico"></i>
            </div>
          </div>
          <p className="pp"><input type="checkbox" name="agree"/> 同意 <span><a href="#/register" className="register">《乐友网隐私服务条款》</a></span></p>
          <button className="yo-btn yo-btn-stacked" onClick={this.submit.bind(this)}>下一步</button>
          <p className="p1"><a href="#/register" className="register">遇到问题？你可以<span> 联系客服</span></a><a href="#/callpassword" className="callpassword"></a></p>
        </div>
        <Dialog  title="提示" show={this.state.dialogShow} onOk={() => this.dialogOk()} onCancel={() => this.dialogOk()}>
            <p>{this.state.dialogContent}</p>
        </Dialog>
      </div>
    )
  }
}
export default Register
