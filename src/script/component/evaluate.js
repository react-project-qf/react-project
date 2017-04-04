import React from 'react'
import List from '../../component_dev/list/src/'
import fetchData from '../util/util.fetch.js'

class Evaluate extends React.Component {
	constructor(props) {
    super(props)
  
  }
  render() {
    return (
      <div className="evaluate">
         <div className="cartNone">
        <img src="./images/comment_empty_icon.png" alt=""/>
        <p>及时评价的你，棒棒哒！</p>
      </div>
    </div>
    )
  }
}

export default Evaluate