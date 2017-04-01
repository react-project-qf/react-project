import React from 'react'
import ReactDom from 'react-dom'
import fetchData from '../util/util.fetch.js'
class Page extends React.Component{
  constructor(props){
    super(props)
    this.state={
      storeListData:[<div/>]
    }
  }
  render() {
    return(
      <ul className="shop">
        {this.state.storeListData}
      </ul>
    )
  }
  componentDidMount(){
    let url='/recommend/home?page=1&num=5'
    fetchData(url,function(res){
      console.log(res)
      let Lis = res.data.list.map(val=>{
        console.log(val);
        return(
          <li className="item">
              <div className="logo">
                <img src={val.skuList[0].image} />
              </div>
              <div className="shop-msg">
                <div className='shop-name'>
                  <div className="name">{val.masterName}</div>
                  <div className="subName">{val.slaveName}</div>
                </div>
                <div className="content">
                  <div className="price">￥{val.minPrice}</div>
                </div>
              </div>
            </li>
        )
      })
      this.setState({
        storeListData:Lis
      })
    }.bind(this))
  }
}
export default Page