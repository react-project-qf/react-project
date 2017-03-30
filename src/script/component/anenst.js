import React from 'react'
import MHeader from './m-header'

class Anenst extends React.Component{
  constructor(props) {
      super(props);
      this.state = {}
    }
    render(){
    	return(
    		<div className="about">
    			 <MHeader title="关于乐友"/>
    			 <iframe className="iframe" src="http://www.leyou.com.cn/mob/secureAndPresent"></iframe>
    		</div>
    	)
	}
}
export default Anenst