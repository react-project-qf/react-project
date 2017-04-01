import React from 'react'
import { browserHistory } from 'react-router';

class Header extends React.Component {
	constructor(props) {
      super(props);
			this.state = {
				title:this.props.title,
				count:1
			}
  }
	componentDidMount(){
		this.setState({
			count:this.props.cbcount||1
		})
	}
  back(){
		let c=this.state.count*1;
    browserHistory.go(-c)
  }
	render() {
		return (
			<div className="yo-header">
				<h2 className="title">{this.state.title}</h2>
				<span className="regret yo-ico" onClick={this.back.bind(this)}>&#xf07d;</span>
			</div>
		)
	}
}

export default Header
