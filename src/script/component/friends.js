import React from 'react';
import Carousel from '../../component_dev/carousel/src';
import Scroller from '../../component_dev/scroller/src/index';
class Friends extends React.Component{
	constructor(props) {
    super(props);
    this.state = {
      bannerList: [<li/>]
    };
  }
  renderData(data) {
    console.log("data", data)
    var arr = [];
    data.map(function(m) {
      arr.push(<li className='item'><img className='img' src={m.Pic}/></li>)
    })
    console.log("arr", arr[0])
    this.setState({
      bannerList: arr
    });
  }
  componentWillMount() {
    fetch('./api/mall/postIndexData')
      .then(response => response.json())
      .then(data => {
        console.log("sds", data)
        this.renderData(data.slider);
      })
      .catch(e => console.log("Oops, error", e))
  }
  render(){
    return(
      <div id="content" className="container">
			<Scroller ref="scroller" usePullRefresh={true}  useLoadMore={true}
			extraClass={'yo-scroller-fullscreen'} scrollY={true}>
				<div className="fa">
					<ul>
						<li>
						<span className="fa_fa">发现</span>
						<span className="fa_guan">关注</span>
						</li>
					</ul>
				</div>
				<Carousel>
				    {this.state.bannerList}
				</Carousel>
				<div className="article">
					<h3 className="biao">
					<span className="yan">【乐活动】</span>陪宝宝赏花去！你带什么？
					<input id="canj" type="button" value="参加"/>
					</h3>
					<span className="time_end">
						04月05日 17:00结束
					</span>
					<div className="nei_xin">
						<p>春游是个美美的日子，可带上宝宝又是另一番美丽的光景。
							外出前要做好准备，都带些什么？快来分享~
						</p>
					</div>
					<div className="can_tu">
						<ul>
							<li><img src="./images/pin1.png"/></li>
							<li><img src="./images/pin2.png"/></li>
							<li><img src="./images/pin3.png"/></li>
						</ul>
					</div>
				</div>


				<div className="article">
					<h3 className="biao">
						A标守护，为妈妈们颁奖啦
					<input id="canj" type="button" value="参加"/>
					</h3>
					<span className="time_end">
						04月20日 17:00结束
					</span>
					<div className="nei_xin">
						<p>通过这次活动，妈妈们对婴童装有了更深刻地了解，
							守护宝宝吃、穿、玩的每一方面，小乐来为妈咪们颁奖喽！
						</p>
					</div>
					<div className="can_tu">
						<ul>
							<li><img src="./images/pin4.png"/></li>
							<li><img src="./images/pin5.png"/></li>
							<li><img src="./images/yous.png"/></li>
						</ul>
					</div>
				</div>
			</Scroller>
    	</div>
    )
  }
}
export default Friends
