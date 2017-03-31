import React from 'react'
import MHeader from './m-header'

class Invitation extends React.Component{
  constructor(props) {
      super(props);
      this.state = {}
    }
    render(){
    	return(
    		<div className="invitation">
    			<MHeader title="邀请闺蜜赚小钱"/>
		         <div className="yao_bg">
              <img src="/images/invitebg.jpg"/>
             </div>
    		</div>
    	)
	}
}
export default Invitation