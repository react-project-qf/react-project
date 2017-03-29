import React from 'react'
import MHeader from './m-header'
import DateTimePicker from '../../component_dev/datetimepicker/src';
import Modal from '../../component_dev/modal/src';
import { browserHistory,Link } from 'react-router';
import fetchData from '../util/util.fetch.js'
import Dialog from '../../component_dev/dialog/src'
import {loading} from '../../component_dev/loading/src'

class Register extends React.Component{
  constructor(props) {
      super(props);
      this.state = {
         babyBirthday: '2016-11-02',
         show:false,
         phone:window.localStorage.getItem("ly-phone"),
         password:"",
         tjCode:"",
         dialogShow:false,
         dialogContent:"温馨提示",
         registerState:"",
      }
      //未获得手机号返回register-1
      if(this.state.phone==""||this.state.phone==null){
        location.href='#/register-1';
      }
  }
  dateTimePicker(){
    this.setState({ show: true });
  }
  bindPassword(e){
    this.setState({
      password:e.target.value
    })
  }

  submit(){
    let phone=this.state.phone;
    let password=this.state.password;
    let babyBirthday=this.state.babyBirthday;
    if(!(/^[a-zA-Z\d_]{6,}$/.test(password))){
      this.setState({
        dialogShow:true,
        dialogContent:"密码必须为字母数字下划线且大于6位哦"
      })
    }else{
      window.localStorage.setItem("ly-phone",phone);
      window.localStorage.setItem("ly-babyBirthday",babyBirthday);
      let url='http://datainfo.duapp.com/shopdata/userinfo.php?status=register&userID='+phone+'&password='+password;
      loading.show();
      fetchData(url,(data)=>{
        loading.hide();
        if (data==0) {
          this.setState({
            dialogShow:true,
            dialogContent:"此手机号已经注册，请直接登陆",
            registerState:0
          })
          // location.href='#/login';
        }else if(data==2){
          this.setState({
            dialogShow:true,
            dialogContent:"服务器繁忙，请稍后重试"
          })
        }else if(data==1){
          this.setState({
            dialogShow:true,
            dialogContent:"注册成功",
            registerState:1
          })
          //先这样存着，有时间的话加上加密算法
          window.localStorage.setItem("ly-auth",phone+password);
          // location.href='#/my';
        }
      })
    }
  }
  dialogOk(){
    this.setState({
      dialogShow:false
    })
    if (this.state.registerState==0) {
      location.href='#/login';
    }else if(this.state.registerState==1){
      location.href='#/my';
    }
  }
  render(){
    return(
      <div className="register">
        <MHeader title="注册"/>
        <div className="content">
          <div className="yo-list yo-list-group">
            <h3 className="label"></h3>
            <div className="item">
              <i className="yo-ico">设置密码</i>
              <div className="flex"><input type="password" value={this.state.password} onChange={this.bindPassword.bind(this)} placeholder="6-20位 建议数字/英文/符号组合"/></div>
              <i className="yo-ico ico" >&#xf063;</i>
            </div>
            <div className="item">
              <i className="yo-ico">宝宝生日</i>
              <div className="flex"><input type="text" onClick={this.dateTimePicker.bind(this)} value={this.state.babyBirthday} placeholder="生日/预产期"/>
              </div>
            </div>
            <div className="item">
              <i className="yo-ico">推荐码&nbsp;</i>
              <div className="flex"><input type="password" placeholder="填写顾问工号，专享至尊服务"/></div>
            </div>
          </div>
          <button className="yo-btn yo-btn-stacked" onClick={this.submit.bind(this)}>提交</button>
        </div>
        <Modal
          show={this.state.show}
          animation={{animation: ['fade-in-down', 'actionsheet-down'], duration: 200}}
          onMaskTap={() => {
              this.setState({ show: false });
          }}
        >
          <div className="datePicker">
            <DateTimePicker
              value={this.state.babyBirthday}
              unitsInline={['年', '月', '日']}
              range={['2010-01-01','2019-12-31']}
              dateOrTime="date"
              onChange={babyBirthday => this.setState({ babyBirthday })}
            />
          </div>
       </Modal>
       <Dialog  title="提示" show={this.state.dialogShow} onOk={() => this.dialogOk()} onCancel={() => this.dialogOk()}>
           <p>{this.state.dialogContent}</p>
       </Dialog>
      </div>
    )
  }
}
export default Register
