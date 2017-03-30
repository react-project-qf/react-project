import React from 'react'

class ProductMenu extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			menu: this.props.data,
			isSpread: this.props.isSpread,
		}
	}
	render() {
		return (
			<div >
			{this.state.menu.c_name}
			</div>
		)
	}
}
export default ProductMenu