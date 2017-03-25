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
			<div className="m-index"> 
				<header></header>
				<section>
					{this.state.name}
				</section>
				<footer></footer>
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