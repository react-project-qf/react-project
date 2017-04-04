import {
  Link
} from 'react-router'
import 'babel-polyfill';
import React, {
  Component
} from 'react';
import Carousel from '../../component_dev/carousel/src';
import Scroller from '../../component_dev/scroller/src/index';
import fetchData from '../util/util.fetch.js';
class Page extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      homeList: []
    };
  }
  renderHomeData(data) {
    console.log("遍历homeList")
    var list = []
    data.map(function(m) {
      list.push(<li>
        <Link to={'/detail/'+m.sku}>
        <span className="lei_tu">
          <img src={m.pic}/>
        </span>
        <p className="lei_xin">
          <span className="HomeListTitle">{m.title}</span>
            <span className="homeListPrice">
              <span className="homeListPrice1">￥{m.sale_price}</span>
            </span>
        </p>
        </Link>
      </li>)
    })
    this.setState({
      homeList: list
    });
  }
  componentWillMount() {
    let url = '/api/mall/postIndexData'
    fetchData(url, (data) => {
      this.renderHomeData(data.recommend)
    })
   
  }
  render(){
    return(
      <Scroller ref="scroller" usePullRefresh={true}  useLoadMore={false}
      extraClass={'yo-scroller-fullscreen'} scrollY={true} onRefresh={() => {
        console.log("上拉刷新")
        this.setState({
          homeList: []
        })
        let url = './api/mall/postIndexData'
        fetchData(url,(data) => { 
          this.renderHomeData(data.recommend)
          this.refs.scroller.stopRefreshing(true)
        })
      }}>
       <div className="homeListUl">
          <ul>
           {this.state.homeList}
          </ul>
        </div>
        </Scroller>
       ) 
  }
}
export default Page