import React from 'react'
import MHeader from './m-header'
import { Link } from 'react-router'
import Dialog from '../../component_dev/dialog/src'
import Toast from '../../component_dev/toast/src'
import fetchData from '../util/util.fetch.js'
import {loading} from '../../component_dev/loading/src'

class Login extends React.Component{
  constructor(props) {
      super(props);
      this.state = {
        phone:window.localStorage.getItem("ly-phone"),
        password:"",
        dialogShow:false,
        dialogContent:"温馨提示"
      }
  }
  bindPhone(e){
    this.setState({
     phone: e.target.value
   })
  }
  bindPassword(e){
    this.setState({
      password:e.target.value
    })
  }
  submit(){
    let phone=this.state.phone;
    let password=this.state.password;
    if (phone==""||phone==null) {
      this.setState({
        dialogShow:true,
        dialogContent:"手机号忘填啦"
      })
      return 0
    }else if(password==null||password==""){
      this.setState({
        dialogShow:true,
        dialogContent:"密码忘填啦"
      })
    }else if(!(/^1[34578]\d{9}$/.test(phone))){
      this.setState({
        dialogShow:true,
        dialogContent:"手机号格式有误"
      })
    }else{
      loading.show();
      window.localStorage.setItem("ly-phone",phone);
      let url='http://datainfo.duapp.com/shopdata/userinfo.php?status=login&userID='+phone+'&password='+password;
      fetchData(url,(data)=>{
        loading.hide();
        if (data==0) {
          this.setState({
            dialogShow:true,
            dialogContent:"此用户不存在",
          })
        }else if(data==2){
          this.setState({
            dialogShow:true,
            dialogContent:"用户名密码不符"
          })
        }else if(data instanceof Object){
          Toast.show('登陆成功', 3000);
          //先这样存着，有时间的话加上加密算法
          window.localStorage.setItem("ly-auth",phone+password);
          location.href='#/user';
        }else{
          this.setState({
            dialogShow:true,
            dialogContent:"服务器忙，请稍后重试"
          })
        }
      })
    }
  }
  dialogOk(){
    this.setState({
      dialogShow:false
    })
  }
  clearInput(e){
    this.refs[e].value=""
  }
  render(){
    return(
      <div className="login">
        <MHeader title="登陆"/>
        <div className="content">
          <div className="yo-list yo-list-group">
            <h3 className="label"></h3>
            <div className="item">
              <i className="yo-ico">账号</i>
              <div className="flex"><input type="text" ref="username" value={this.state.phone} onChange={this.bindPhone.bind(this)} placeholder="用户名/手机号"/></div>
              <i className="yo-ico ico" onClick={this.clearInput.bind(this,"username")}>&#xf063;</i>
            </div>
            <div className="item">
              <i className="yo-ico">密码</i>
              <div className="flex"><input ref="password" value={this.state.password} onChange={this.bindPassword.bind(this)} type="password" placeholder="6-10位密码"/></div>
              <div className="info"></div>
              <i className="yo-ico ico" onClick={this.clearInput.bind(this,"password")}>&#xf063;</i>
            </div>
          </div>
          <button className="yo-btn yo-btn-stacked" onClick={this.submit.bind(this)}>登录</button>
          <p className="p1"><Link to="/register-1"><a className="register">快速注册</a></Link><a href="#/callpassword" className="callpassword">找回密码</a></p>
        </div>
        <div className="buttom">
          <p className="liner"></p>
          <p className="otherlogin">其他方式登录</p>
          <img src="./images/login_store.png"/>
          <p className="hfistlogin">门店会员，首次登陆</p>
        </div>
        <Dialog  title="提示" show={this.state.dialogShow} onOk={() => this.dialogOk()} onCancel={() => this.dialogOk()}>
            <p>{this.state.dialogContent}</p>
        </Dialog>
      </div>
    )
  }
}
export default Login
