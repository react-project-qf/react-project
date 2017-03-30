import React from 'react'
import { browserHistory } from 'react-router';

class Header extends React.Component {
	constructor(props) {
      super(props);
			this.state = {
				title:this.props.title
			}
  }
  back(){
    browserHistory.go(-1)
  }
	render() {
		return (
			<div className="yo-header">
				<h2 className="title">{this.state.title}</h2>
				<span className="regret yo-ico" onClick={this.back}>&#xf07d;</span>
			</div>
		)
	}
}

export default Header
