import React from 'react'
import MHeader from './m-header'
import $ from 'jquery'
import { browserHistory,Link } from 'react-router'
import Dialog from '../../component_dev/dialog/src'

class Register extends React.Component{
  constructor(props) {
      super(props);
      this.state = {
        phone:"",
        verCode:"",
        dialogShow:false,
        dialogContent:"温馨提示",
        check:true,
        disable:false,
        sendCode:"发送验证码",
        iTime:59,
        Account:""
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
    //检验验证码
    let st=this.state.verCode == window.localStorage.getItem("ly-code");
		if (!st) {
      this.setState({
        dialogShow:true,
        dialogContent:"验证码有误"
      })
			return 0;
		}

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
  clearInput(e){
    this.refs[e].value=""
  }
  checkChenge(){
    this.setState({
      check:!this.state.check
    })
    if (!this.state.check) {

    }
  }
  //http://rumengkai.com/sms.php 作用发送验证码，发送成功，返回  msg.cb=0。
  get_mobile_code(){
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
    }
		this.RemainTime();//则显示倒计时
    $.post('http://rumengkai.com/sms.php', {mobile:$.trim(this.state.phone)}, function(data) {
				var msg=JSON.parse(data);
				if(msg.cb==0){
					window.localStorage.setItem("ly-code",msg.code);
					console.log("发送成功");
				}else{
          window.localStorage.setItem("ly-code","");
					console.log("发送失败");
				}
    });
	};

	RemainTime(){
		this.setState({
      disable:true
    })
		let iSecond,sSecond="",sTime="",iMinute;
		if (this.state.iTime >= 0){
			iSecond = parseInt(this.state.iTime%60);
			iMinute = parseInt(this.state.iTime/60)
			if (iSecond >= 0){
				if(iMinute>0){
					sSecond = iMinute + "分" + iSecond + "秒";
				}else{
					sSecond = iSecond + "秒";
				}
			}
			sTime=sSecond;
			if(this.state.iTime==0){
				clearTimeout(this.state.Account);
				sTime='发送验证码';
				this.state.iTime = 59;
				this.setState({
          disable:false
        });
			}else{
        this.state.iTime=this.state.iTime-1;
        clearTimeout(this.state.Account);
				this.state.Account = setTimeout(this.RemainTime.bind(this),1000);
			}
		}else{
			sTime='无倒计时';
		}
		this.setState({
      sendCode:sTime
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
              <div className="flex"><input type="text" ref="phone" value={this.state.phone} onChange={this.bindPhone.bind(this)} placeholder="用户名/手机号"/></div>
              <i className="yo-ico ico" onClick={this.clearInput.bind(this,"phone")}>&#xf063;</i>
            </div>
            <div className="item">
              <i className="yo-ico">验证码</i>
              <div className="flex"><input type="text" value={this.state.verCode} onChange={this.bindverCode.bind(this)} placeholder="6-10位密码"/></div>
              <button className="info" disabled={this.state.disable} style={{background:this.state.disable?"#ccc":"#fff",color:this.state.disable?"#fff":"#8c8984"}} onClick={this.get_mobile_code.bind(this)}>{this.state.sendCode}</button>
              <i className="yo-ico"></i>
            </div>
          </div>
          <p className="pp"><input type="checkbox" checked={this.state.check} name="agree" onClick={this.checkChenge.bind(this)}/> 同意 <span><a href="#/register" className="register">《乐友网隐私服务条款》</a></span></p>
          <button className="yo-btn yo-btn-stacked" disabled={!this.state.check} style={{background:this.state.check?"":"#aaa",border:"none"}} onClick={this.submit.bind(this)}>下一步</button>
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
