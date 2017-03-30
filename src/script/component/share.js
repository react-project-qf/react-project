import React from 'react'
import Modal from '../../component_dev/modal/src/'

class Share extends React.Component{
  constructor(props) {
      super(props);
      this.state = {}
    }
    render(){
    	return(
    		<div className="share">
    			<Modal
              show={true}
              align="center"
              contentOffset={[0, 100]}
              maskOffset={[0, 200]}
              animation={{animation: ['actionsheet-up', 'actionsheet-down'], duration: 200}}
          >
              <p>The Modal content</p>
          </Modal>
    		</div>
    	)
	}
}
export default Share