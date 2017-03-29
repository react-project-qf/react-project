import React from 'react'
import Carousel from '../../component_dev/carousel/src'
import Scroller from '../../component_dev/scroller/src/index';
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bannerList: [<li/>]
    };
  }
  renderData(data) {
    // console.log("data", data)
    var arr = [];
    data.map(function(m) {
      arr.push(<li className='item'><img className='img' src={m.Pic}/></li>)
    })
    // console.log("arr", arr[0])
    this.setState({
      bannerList: arr
    });
  }
  componentWillMount() {
    fetch('./api/mall/postIndexData')
      .then(response => response.json())
      .then(data => {
        // console.log("sds", data)
        this.renderData(data.slider);
      })
      .catch(e => console.log("Oops, error", e))
  }
  render() {
    return (
      <div id="content" className="container">
			<Scroller ref="scroller" usePullRefresh={true}  useLoadMore={true}
			extraClass={'yo-scroller-fullscreen'} scrollY={true}>
				<span className="guang">广告</span>
				<Carousel>
				    {this.state.bannerList}
				</Carousel>
				<div className="homeTitle">
					<ul>
						<li><i></i><b>乐海淘</b></li>
						<li><i></i><b>乐乐闪</b></li>
						<li><i></i><b>身边门店</b></li>
						<li><i></i><b>乐活动</b></li>
						<li><i></i><b>福利驾到</b></li>
						<li><i></i><b>乐友顾问</b></li>
						<li><i></i><b>新生儿必备</b></li>
						<li><i></i><b>签到</b></li>
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
                                00:11:05
                            </span>
                        </div>
                    </a>
                    <a className="homeList1">
                        <div className="product-img1">
                            <img src="" alt="" />
                        </div>
                        <p className="product">蒂雅多车模旅游巴士儿童玩...</p>
                        <div classname="product1-price">
                            <span id="product1-price">￥38.00</span>
                        </div>
                    </a>
				</div>
			</Scroller>
    	</div>
    )
  }
  componentDidMount() {
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
