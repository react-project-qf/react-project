import React from 'react'

class Index extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			name: ""
		}
	}
	render() {
		return (
			<div> 
				{this.state.name}
			</div>
		)
	}
	componentDidMount() {
		fetch('/api/list.php')
			.then(response => response.json())
			.then(
				res => {
					console.log("aaaa");
					console.log(res);
					this.setState({
						name: <div>{res.name}</div>
					})
				})
	}
}

export {
	Index as
	default
}