import 'babel-polyfill'
import React from 'react'
import $ from 'jquery'
import Ajax from './ajax'
import {
  Link
} from 'react-router'
import Dialog from '../../component_dev/dialog/src'
import Toast from '../../component_dev/toast/src'
import Carousel from '../../component_dev/carousel/src'
import fetchData from '../util/util.fetch.js'
import Scroller from '../../component_dev/scroller/src/index'
class Detail extends React.Component {
  constructor(props) {
    super(props)
    this.props.prodDetail=""
    this.state = {
      detailList: [<li/>],
      List: this.props.params.id,
      marketing_title: "",
      promotionTitle: "",
      price: '',
      prodDetail: '',
      dialogShow: false,
      dialogContent: "温馨提示",
      prod_id: "",
      name: "",
      count: "",
      marketPrace: "",
      sale_price: "",
      imgUrl: "",
      sku: "",
      ischeck: ""
    }
  }
  detailData(data) {
    console.log("遍历detailbanner")
    var arr = []
    data.map(function(m) {
      arr.push(<li className='item'><img className='img' src={m}/></li>)
    })
    this.setState({
      detailList: arr
    });
  }
  getCat() {
    this.setState({
      dialogShow: false,
      dialogContent: "加入购物车"
    })
    if (this.state.prod_id != "" && this.state.imgUrl != "") {
      var goods = {
        "prod_id": this.state.prod_id,
        "name": this.state.marketing_title,
        "count": 1,
        "marketPrace": this.state.sale_price * 1 + 10,
        "sale_price": this.state.sale_price * 1,
        "imgUrl": this.state.imgUrl,
        "sku": this.state.sku,
        "ischeck": true
      }
      var list = JSON.parse(window.localStorage.getItem("ly-goodList"))
      var flag = 0
      var str = ""
      if (list == null) {
        list = []
        list.push(goods)
        str = JSON.stringify(list)
        window.localStorage.setItem("ly-goodList", str);
        Toast.show('加入购物车成功', 3000);
      } else {
        for (var i = 0; i < list.length; i++) {
          if (goods.prod_id == list[i].prod_id) {
            list[i].count = list[i].count + 1
            flag = 1
          }
        }
        if (flag == 1) {
          str = JSON.stringify(list)
          window.localStorage.setItem("ly-goodList", str)
        } else {
          list.push(goods)
          str = JSON.stringify(list)
          window.localStorage.setItem("ly-goodList", str)
        }
        Toast.show('加入购物车成功', 3000);
      }
    } else {
      Toast.show('网络异常请稍后', 3000);
    }
  }
  dialogOk() {
    this.setState({
      dialogShow: false
    })
  }

  componentDidMount() {
    console.log(this);
    console.log(window.scrollY);
    console.log(Scroller.prototype);
    var that = this
    Ajax("api/product/getGoodsInfo", {
      sku: this.state.List
    }, function(data) {
      that.setState({
        prodDetail: data.prodDetail
      });
    })
    // setTimeout(function () {
    //   that.setState({
    //     prodDetail: that.state.prodDetail
    //   });
    // },6000)


    Ajax("/api/Product/single_ajax/type/skuInfo", {
      sku: this.state.List
    }, function(data) {
      var mRex = that.state.List
      mRex = mRex.substr(0, 9)
      console.log("wamg", data)
      that.detailData(data.sizeColor[mRex].images)
      that.setState({
        promotionTitle: data.promotionTitle[0].title,
        price: data.info.sale_price,
        sale_price: data.info.sale_price,
        sku: data.info.sku,
        imgUrl: data.sizeColor[mRex].images[0]
      });
    })
    Ajax("api/Product/single_ajax/type/getTags", {
      sku: this.state.List
    }, function(data) {
      console.log("ya", data)
      that.setState({
        marketing_title: data.marketing_title,
        prod_id: data.prod_id
      });
    })
  }

  componentDidUpdate(){
  }
  render() {
    return (
      <div className="container m-detail" id="content" >
      <Scroller ref="scroller" usePullRefresh={false}  useLoadMore={false}
      extraClass={'yo-scroller-fullscreen'} scrollY={true}>
      <div className="firstDIV">
        <Carousel>
           {this.state.detailList}
          </Carousel>
          <div className="detaiTitle">
              <p>{this.state.marketing_title}</p>
              <span>{this.state.promotionTitle}</span>
          </div>

        <div className="productPrice">
            <span id="price">￥{(this.state.price*1).toFixed(2)}</span>
            <span>送{this.state.price}积分</span>
            <div className="Shopowner">
              <div className="img"><img src="./images/noavatar.png" alt=""/></div>
              <p clssName="pTitle">乐友品质,甄选奉上</p>
              <p className="name">王春兰<span>店长推荐</span><span>品质保障</span></p>
            </div>
        </div>
        <div className="ProductInformation">
          <ul>
            <li className="liFirst">图文详情</li>
            <li>规格参数</li>
            <li>售后服务</li>
          </ul>
        </div>
        <div dangerouslySetInnerHTML={{__html:this.state.prodDetail}} className="Image">
        </div>
      </div>
      </Scroller>
        <div className="detailFooter">
          <span><img src="./images/nav_follow_no.png" alt=""/></span>
          <span><Link to="/cart"><img src="./images/nav_shop_off.png" alt=""/></Link></span>
          <span className="toCat" onClick={this.getCat.bind(this)}>加入购物车</span>
        </div>
        <Dialog  title="提示" show={this.state.dialogShow} onOk={() => this.dialogOk()} onCancel={() => this.dialogOk()}>
            <p>{this.state.dialogContent}</p>
        </Dialog>
      </div>
    )
  }
}
export default Detail
