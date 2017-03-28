import React from 'react'
import Carousel from '../../component_dev/carousel/src'

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '2016-11-02',
      bannerList: [<li/>]
    };
  }
  render() {
    return (
      <div className="m-home">
        <Carousel>
        {this.state.bannerList}
        </Carousel>
      </div>
    )
  }
  componentDidMount() {
    let url = "/api/mall/postIndexData/";
    fetch(url)
      .then(response => response.json())
      .then(
        res => {
          console.log(res.slider);
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