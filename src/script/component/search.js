import React from 'react'
import Ajax from './ajax'
import {
  browserHistory
} from 'react-router'
import Scroller from '../../component_dev/scroller/src/index'
class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 1,
      flag: false,
      sign: "搜索",
      searchList: [<li/>]
    }
  }
  back() {
    let c = this.state.count * 1;
    browserHistory.go(-c)
  }
  toKind() {
    if (this.refs.searchValue.value != "") {
      this.setState({
        sign: "筛选"
      })
      let that = this
      let url = './api/mall/postIndexData'
      Ajax(url, {}, function(data) {
        that.renderHomeData(data.recommend)
      })
    }
  }
  getFlag() {
    if (this.state.flag) {
      return {
        display: "block"
      }
    } else {
      return {
        display: "none"
      }
    }
  }
  clearValue() {
    this.refs.searchValue.value = ''
    console.log(this.refs.searchValue.value, "dewq ")
    if (this.refs.searchValue.value == '') {
      this.setState({
        flag: false,
        sign: "搜索"
      })
      this.setState({
        searchList: [<li/>]
      })
    }
  }
  toCheach() {
    if (this.refs.searchValue.value != "") {
      this.setState({
        flag: true
      })
    } else {
      this.setState({
        flag: false,
        sign: "搜索",
        searchList: [<li/>]
      })
    }
  }
  renderHomeData(data) {
    console.log("遍历searchList")
    var list = []
    let that = this;
    data.map(function(m) {
      list.push(
        <li>
          <a href={"#/detail/"+m.sku}>
            <img src={m.pic}/>
            <p className="searchListTitle">{m.title}</p>
            <p className="searchListPrice">
              <span className="searchListPrice1">￥{m.sale_price}</span>
              <span className="searchListPrice2">查看详情&gt;&gt;</span>
            </p>
          </a>
      </li>)
    })
    this.setState({
      searchList: list
    });
  }
  componentDidMount() {

  }

  render() {
    return (
      <div className="m-search">
       <header>
        <ul className="yo-header yo-header-a">
          <li><span className="regret yo-ico" onClick={this.back.bind(this)}>&#xf07d;</span></li>
          <li><form className="yo-search">
                <label className="action">
                 <span className="yo-ico">&#xf067;</span>
                  <input type="text"  className="input" autofocus="autofocus" placeholder="搜索乐友商品" onChange={this.toCheach.bind(this)}  ref="searchValue"/>
                </label>
                </form></li>
          <li><span onClick={this.toKind.bind(this)}>{this.state.sign}</span></li>
          <span className="leftSearch" style={this.getFlag()} onClick={this.clearValue.bind(this)}><img src="./images/login_delete.png" alt="" /></span>
        </ul>
      </header>
      <div className="screen" style={this.getFlag()}>
        <ul className="screenFirst">
          <li>
            <span className="active">销量</span>
            <span activeClassName="active">价格</span>
            <span activeClassName="active">新品优先</span>
          </li>
          <li><img src="./images/set_up.png" /></li>
        </ul>
        <ul className="screenTwo">
          <li><span>品类</span></li>
          <li><span>品牌</span></li>
        </ul>
      </div>
        <Scroller ref="scroller" style={this.getFlag()} usePullRefresh={false}  useLoadMore={false}
        extraClass={'yo-scroller-fullscreen'} scrollY={true} onRefresh={() => {
        console.log("下拉刷新")
        let url = './api/mall/postIndexData'
        var that = this
        Ajax(url, {}, function(data) {
          that.renderData(data.slider)
          that.renderHomeData(data.recommend)
          that.refs.scroller.stopRefreshing(true)
        })
      }}>
        <ul>
           {this.state.searchList}
        </ul>
      </Scroller>
      </div>
    )
  }
}
export default Search