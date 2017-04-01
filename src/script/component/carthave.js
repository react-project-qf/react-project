import React from 'react'
import Header from './m-header'
import List from '../../component_dev/list/src'
class Cart extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      goodList:window.localStorage.getItem("ly-goodList"),
      comList:[<li></li>],
      goods:JSON.parse(window.localStorage.getItem("ly-goodList"))||[<li></li>],
      allcheck:true,
      cart_num:0,
      totalmoney:288
    };
  }
  componentWillMount(){
    //判断购物车是否为空
    if (this.state.goodList==""||this.state.goodList==null) {
      location.href='#/cart';
      return
    }
    this.loadList();
  }
  loadList(){
    let totalmoney=0;
    let allcount=0;
    let self=this;
    this.state.comList=this.state.goods.map(function (item,index) {
      if (self.state.goods[index].ischeck) {
        allcount+=item.count;
        totalmoney+=item.marketPrace*item.count;
      }
      return (<li>
        <div className="img">
          <img src={self.state.goods[index].ischeck?"./images/public_round_check_on.png":"./images/public_round_check_off.png"} onClick={self.changeCheck.bind(self,index)}/>
          <img src={self.state.goods[index].imgUrl} onClick={self.toDetail.bind(self,self.state.goods[index].sku)}/>
        </div>
        <div className="info">
          <p>{self.state.goods[index].name}</p>
          <div>
            <span className="price">￥{self.state.goods[index].marketPrace.toFixed(2)}</span>
            <div className="number">
              <span className={self.state.goods[index].isone ? "minus disable" : "minus"} onClick={self.minus.bind(self,index)}>-</span>
              <input type="text" class="input" value={self.state.goods[index].count}/>
              <span className="plus" onClick={self.plus.bind(self,index)}>+</span>
            </div>
          </div>
        </div>
      </li>)
    });
    this.state.cart_num=allcount;
    this.state.totalmoney=totalmoney*1;
  }
  //加
  plus(n){
    this.state.goods[n].count++;
    this.state.goods[n].isone=false;
    this.setState({});
    this.loadList();
    window.localStorage.setItem("ly-goodList", JSON.stringify(this.state.goods));
  }
  //减
  minus(n){
    if (this.state.goods[n].count<=1) {
      this.state.goods[n].isone=true;
      this.loadList();
      this.setState({});
    }else{
      this.state.goods[n].count--;
      this.loadList();
      this.setState({});
    }
    window.localStorage.setItem("ly-goodList", JSON.stringify(this.state.goods));
  }
  //改变选中状态
  changeCheck(n){
    this.state.goods[n].ischeck=!this.state.goods[n].ischeck;
    let c=true;
    for (var item in this.state.goods) {
      c=c&&this.state.goods[item].ischeck;
    }
    this.state.allcheck=c;

    this.loadList();
    this.setState({});
  }
  changeAllcheck(){
    this.state.allcheck=!this.state.allcheck;
    for (var item in this.state.goods) {
      this.state.goods[item].ischeck=this.state.allcheck;
    }
    this.loadList();
    this.setState({});
  }
  //去详情
  toDetail(sku){
      window.location.href="#/detail/"+sku;
  }
  //去结算
  goPay(){
    location.href='#/gopay';
  }
  render(){
    return(
      <div className="m-cart">
        <Header title="购物车" cbcount="2"></Header>
        <List
        dataSource={[{}]}
        extraClass = {'yo-list-fullscreen list'}
        renderItem={(item,i)=>{
          return (
               <div>
                 <img className="topimg" src="./images/bg_cart.jpg" alt=""/>
                 <div className="cartHave">
                   <div className="all">
                     <div className="yo-list yo-list-group">
                       <h3 className="label"></h3>
                       <h3 className="label"></h3>
                       <div className="item">
                         <i className="yo-ico"> <img src={this.state.allcheck?"./images/public_round_check_on.png":"./images/public_round_check_off.png"} onClick={this.changeAllcheck.bind(this)}/> </i>
                         <div className="flex">乐商城</div>
                       </div>
                     </div>
                   </div>
                   <div className="cartList">
                     <ul>
                       {this.state.comList}
                     </ul>
                   </div>
                 </div>
               </div>
             );
         }}
        />
          <div className="bottom">
            <img src={this.state.allcheck?"./images/public_round_check_on.png":"./images/public_round_check_off.png"} onClick={this.changeAllcheck.bind(this)} alt=""/>
            <span>全选</span>
            <div className="heji">
              <p>合计：<span>￥{this.state.totalmoney.toFixed(2)}</span></p>
              <p>已优惠：<span>￥0.00</span></p>
            </div>
            <div className="js" onClick={this.goPay}>
              去结算({this.state.cart_num})
            </div>
          </div>
      </div>
    )
  }
  componentDidUpdate(){
  }
}
export default Cart
