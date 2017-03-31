import React from 'react'
import Carousel from '../../component_dev/carousel/src'
import fetchData from '../util/util.fetch.js'
class Detail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      detailList: [<li/>],
      List: this.props.location.query.n
    }
  }
  detailData(data) {
    console.log("遍历detailbanner", data)
    var arr = []
    data.map(function(m) {
      arr.push(<li className='item'><img className='img' src={m.Pic}/></li>)
    })
    this.setState({
      detailList: arr
    });
    console.log(arr)
  }
  componentWillMount() {
    var url = './api/mall/postIndexData'
    fetchData(url, (data) => {
      this.detailData(data.slider)
    })
  }
  render() {
    return (
      <div className="container m-detail" id="content" >
      <Carousel autoplay={ false }>
       <li className='item'><img className='img' src="http://leyouimage.leyou.com.cn/images_db/20/8a/208a41af986aef9834fe8de9b73c81e5.JPG"/></li>
       <li className='item'><img className='img' src="http://leyouimage.leyou.com.cn/images_db/3d/f1/3df1a239ddf1ed12466eb5e035e5f26f.JPG"/></li>
       <li className='item'><img className='img' src="http://leyouimage.leyou.com.cn/images_db/b0/f9/b0f97ad7a50346d95e0e235b94fc06be.JPG"/></li>
       <li className='item'><img className='img' src="http://leyouimage.leyou.com.cn/images_db/88/1a/881a1dba9884a4fa558697e9a60fe001.JPG"/></li>
       <li className='item'><img className='img' src="http://leyouimage.leyou.com.cn/images_db/b0/f9/b0f97ad7a50346d95e0e235b94fc06be.JPG"/></li>
       <li className='item'><img className='img' src="http://leyouimage.leyou.com.cn/images_db/b0/f9/b0f97ad7a50346d95e0e235b94fc06be.JPG"/></li>
      </Carousel>
      {this.parmas.id}
      </div>
    )
  }
}
export default Detail