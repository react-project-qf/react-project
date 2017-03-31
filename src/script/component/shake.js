import React from 'react'
import MHeader from './m-header'

class Shake extends React.Component{
  constructor(props) {
      super(props);
      this.state = {}
    }
    render(){
    	return(
    		<div className="shake">
    			<MHeader title="摇一摇"/>
		         <div className="bg_yao">
                <ul>
                  <li>
                    <img className="bg_shang" src="/images/shake_03.png"/>
                    <img className="bg_zuo" src="/images/shake_01.png"/>
                  </li>
                  <li>
                    <img className="bg_xia" src="/images/shake_04.png"/>
                    <img className="bg_you" src="/images/shake_02.png"/>
                  </li>
                </ul>
             </div>
    		</div>
    	)
	}
}
export default Shake