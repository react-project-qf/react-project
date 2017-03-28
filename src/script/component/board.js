import React from 'react'
import Carousel from '../../component_dev/carousel/src/'

class Board extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      swiperList: [<div/>]
    }
  }

  render() {
    return (
      <div className="m-board">
        <div className="swiper">
              <Carousel>
                <li className="item"><img className="img" src="//img1.qunarzz.com/qs/1610/a6/01d1ad00e4b9e102.jpg" /></li>  
                <li className="item"><img className="img" src="//img1.qunarzz.com/qs/1610/a6/01d1ad00e4b9e102.jpg" /></li>  
                <li className="item"><img className="img" src="//img1.qunarzz.com/qs/1610/a6/01d1ad00e4b9e102.jpg" /></li>  
              </Carousel>
        </div>
        <ul>
          <li>
            <div>
              <b></b>
              <i></i>
            </div>
            <ul>
              <li>
                <i></i>
                <b></b>
              </li>
              <li>
                <i></i>
                <b></b>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    )
  }

  componentDidMount() {
    // let url = '/api/v2/movie/in_theaters?count=3'
    fetch(url)
      .then(response=>response.json())
      .then(res=>{
        let Lis = res.subjects.map(val=>{
          return (<li className="item"><img className="img" src={val.images.large} /></li>)
        })
        this.setState({
          swiperList: Lis
        })
      })
  }
}

export default Board
