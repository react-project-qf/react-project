import {
  Link
} from 'react-router'
import 'babel-polyfill';
import React, {
  Component
} from 'react';
import Carousel from '../../component_dev/carousel/src'
import Scroller from '../../component_dev/scroller/src/index'
import fetchData from '../util/util.fetch.js'
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bannerList: [<li/>],
      homeList: [<li/>],
      time: "00:00:00"
    };
  }
  renderData(data) {
    console.log("遍历banner")
    var arr = []
    data.map(function(m) {
      arr.push(<li className='item'><img className='img' src={m.Pic}/></li>)
    })
    this.setState({
      bannerList: arr
    });
  }
  renderHomeData(data) {
    console.log("遍历homeList")
    var list = []
    data.map(function(m) {
      list.push(<li>
        <Link to={'/detail/'+m.sku}><img src={m.pic}/>
        <p className="HomeListTitle">{m.title}</p>
          <p className="homeListPrice"><span className="homeListPrice1">￥{m.sale_price}</span>
          <span className="homeListPrice2">查看详情&gt;&gt;</span></p>
        </Link>
      </li>)
    })
    this.setState({
      homeList: list
    });
  }
  componentWillMount() {

    var _timer = 0;
    var that = this

    function timer() {
      window.clearTimeout(_timer);
      var Hours = '00'
      var Minutes = '00'
      var Seconds = '00'
      var o_date = new Date("2017/4/6");
      var s_date = new Date();
      var _milli = o_date.getTime() - s_date.getTime();
      var _date = new Date(_milli);
      if (_date.getHours() >= 10) {
        Hours = _date.getHours()
      } else {
        Hours = "0" + _date.getHours()
      }
      if (_date.getMinutes() >= 10) {
        Minutes = _date.getMinutes()
      } else {
        Minutes = "0" + _date.getMinutes()
      }
      if (_date.getSeconds() >= 10) {
        Seconds = _date.getSeconds()
      } else {
        Seconds = "0" + _date.getSeconds()
      }
      that.setState({
        time: Hours + ":" + Minutes + ":" + Seconds
      })
      _timer = window.setTimeout(timer, 1000);
    }
    timer();
  }
  render() {
    return (
      <div id="content" className="container">
			<Scroller ref="scroller" usePullRefresh={true}  useLoadMore={false}
			extraClass={'yo-scroller-fullscreen'} scrollY={true} onRefresh={() => {
        console.log("上拉刷新")
        this.setState({
          bannerList: [<li/>],
          homeList: []
        })
        let url = './api/mall/postIndexData'
        fetchData(url,(data) => {
          this.renderData(data.slider)
          this.renderHomeData(data.recommend)
          this.refs.scroller.stopRefreshing(true)
        })
      }}>
        <span className="BannerGuang">广告</span>
				<Carousel>
				    {this.state.bannerList}
				</Carousel>
				<div className="homeTitle">
					<ul>
						<li><i><img src="./images/index_sea.png"/></i><b>乐海淘</b></li>
						<li><i><img src="./images/san.jpg"/></i><b>乐乐闪</b></li>
						<li><i><img src="./images/index_store.png"/></i><b>身边门店</b></li>
						<li><i><img src="./images/index_activity.png"/></i><b>乐活动</b></li>
						<li><i><img src="./images/fli.jpg"/></i><b>福利驾到</b></li>
						<li><i><img src="./images/kef.jpg"/></i><b>乐友顾问</b></li>
						<li><i><img src="./images/bib.jpg"/></i><b>新生儿必备</b></li>
						<li><i><img src="./images/index_sign.png"/></i><b>签到</b></li>
					</ul>
				</div>
				<div className="char">
					<a className="module-title-box">
              <span className="module-title-left-icon"></span>
              <span className="module-title-right-icon yo-ico">&#xf07f;</span>
              <span className="module-title-txt">秒杀</span>
              <div className="module-title-countdown">
                  <span className="count-down-txt" id="orderAndStart">距离结束</span>
                  <span id="orderAndStart2">
                      {this.state.time}
                  </span>
              </div>
          </a>
         <a className="homeList1">
              <div className="product-img1">
                   <img src="./images/ms.JPG"/>
              </div>
              <p className="product">玛力--森林健身</p>
              <div classname="product1-price">
                  <span id="product1-price">￥38.00</span>
              </div>
          </a>
           <a className="homeList1">
              <div className="product-img1">
                 <img src="./images/ms.JPG"/>
              </div>
              <p className="product">玛力--森林健身</p>
              <div classname="product1-price">
                  <span id="product1-price">￥38.00</span>
              </div>
          </a>
           <a className="homeList1">
              <div className="product-img1">
                   <img src="./images/ms.JPG"/>
              </div>
              <p className="product">玛力--森林健身</p>
              <div classname="product1-price">
                  <span id="product1-price">￥38.00</span>
              </div>
          </a>
          <a className="center_tu">
            <img src="./images/tu1.jpg"/>
            <span className="guang1">广告</span>
          </a>
        </div>

        <div className="te_are">
          <div className="te_jie">
            <a className="module-title-box">
              <span className="module-title-left-icon"></span>
              <span className="module-title-txt">特色街</span>
            </a>
            <div className="te_lei">
              <div className="module-content-box">
                <div className="special-market-box">
                  <a className="fangxin">
                    <h3 className="class_title">乐海淘全球购</h3>
                    <p className="class_des">官方授权 保税区发货</p>
                    <span className="fangxin_tu">
                    <span className="guang guang3">广告</span>
                      <img src="./images/fangx2.png"/>
                    </span>

                  </a>
                  <div className="te_you">
                    <a className="te_yous">
                      <div className="you_ti">
                        <h3 className="class_title">婴童牛仔节</h3>
                        <p className="class-des">春季任你行</p>
                      </div>
                      <span className="niu">
                        <img src="./images/yous.png"/>
                      </span>
                      <span className="guang">广告</span>
                    </a>
                    <a className="youx">
                      <div className="youx1">
                        <h3 className="class_title">早夏新装</h3>
                        <p className="class-des">清新上市</p>
                        <span className="youx1_tu">
                            <img src="./images/youx1.png"/>
                        </span>
                         <span className="guang">广告</span>
                      </div>
                      <div className="youx2">
                        <h3 className="class_title">贝瓦故事机</h3>
                        <p className="class-des">育儿好帮手</p>
                        <span className="youx2_tu">
                            <img src="./images/youx2.png"/>
                        </span>
                        <span className="guang">广告</span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
           <div className="center_tu2">
              <img src="./images/center2.jpg"/>
              <span className="guang">广告</span>
            </div>
        </div>


        <div className="pin">
          <a className="module-title-box">
              <span className="module-title-left-icon"></span>
              <span className="module-title-txt">品类馆</span>
          </a>
          <div className="pin_lei">
            <div className="lei">
              <a className="lei_nai">
                <h3 className="class_title">奶粉辅食</h3>
                    <p className="class-des">宝宝健康成长</p>
                    <span className="pin1">
                        <img src="./images/pin1.png"/>
                    </span>
                <span className="guang">广告</span>
              </a>
              <a className="lei_yun">
                <h3 className="class_title">孕妈婴童装</h3>
                    <p className="class-des">A标品放心选</p>
                    <span className="pin2">
                        <img src="./images/pin2.png"/>
                    </span>
                <span className="guang">广告</span>
              </a>
              <a className="lei_niao">
                <h3 className="class_title">尿裤清洁护肤</h3>
                    <p className="class-des">妈咪放心之选</p>
                    <span className="pin3">
                        <img src="./images/pin3.png"/>
                    </span>
                <span className="guang">广告</span>
              </a>
              <a className="lei_tong">
                <h3 className="class_title">童车床椅</h3>
                    <p className="class-des">高品质生活</p>
                    <span className="pin4">
                        <img src="./images/pin4.png"/>
                    </span>
                <span className="guang">广告</span>
              </a>
              <a className="lei_yi">
                <h3 className="class_title">益智玩乐</h3>
                    <p className="class-des">童年玩伴</p>
                    <span className="pin5">
                        <img src="./images/pin5.png"/>
                    </span>
                <span className="guang">广告</span>
              </a>
            </div>
          </div>
        </div>
        <div className="tui">
          <span className="tui_zi">为你推荐</span>
          <span className="tui_xian"></span>
        </div>

        <div className="homeListUl">
          <ul>
           {this.state.homeList}
          </ul>
        </div>
      </Scroller>
    	</div>
    )
  }
  componentDidMount() {
    let url1 = '/api/mall/postIndexData'
    fetchData(url1, (data) => {
      this.renderData(data.slider)
      this.renderHomeData(data.recommend)
    })
    let url = "/api/mall/postIndexData/";
    fetch(url)
      .then(response => response.json())
      .then(
        res => {
          // console.log(res.slider);
          let bList = res.slider.map(function(item, index) {
            return <li className="item"><img className="img" src={item.Pic}/></li>
          });
          this.setState({
            bannerList: bList
          })
        })
  }
}
export default Home
